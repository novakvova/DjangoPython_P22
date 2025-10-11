import random
from rest_framework import viewsets, status, parsers
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils.http import urlsafe_base64_decode

from .utils import verify_recaptcha
from .models import CustomUser
from .serializers import UserSerializer, RegisterSerializer, PasswordResetRequestSerializer, SetNewPasswordSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.tokens import default_token_generator
from rest_framework_simplejwt.views import TokenObtainPairView

FIRST_NAMES = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank"]
LAST_NAMES = ["Smith", "Johnson", "Brown", "Taylor", "Anderson", "Lee"]
DOMAINS = ["example.com", "test.com", "mail.com"]


def generate_random_users(n=5):
    created_users = []

    for _ in range(n):
        while True:
            username = f"user{random.randint(1000, 9999)}"
            if not CustomUser.objects.filter(username=username).exists():
                break

        first_name = random.choice(FIRST_NAMES)
        last_name = random.choice(LAST_NAMES)
        email = f"{first_name.lower()}.{last_name.lower()}@{random.choice(DOMAINS)}"

        user = CustomUser.objects.create(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email
        )
        created_users.append(user)

    return created_users


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    @action(detail=False, methods=["post"])
    def generate(self, request):
        users = generate_random_users(5)
        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'], url_path='register', serializer_class=RegisterSerializer)
    def register(self, request):

        recaptcha_token = request.data.get("recaptcha_token")
        if not recaptcha_token:
            return Response({"detail": "Missing reCAPTCHA token"}, status=400)

        result = verify_recaptcha(recaptcha_token)
        if not result.get("success") or result.get("score", 0) < 0.5:
            return Response({"detail": "Invalid reCAPTCHA"}, status=400)


        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            refresh = RefreshToken.for_user(user)

            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'], url_path='password-reset-request',serializer_class=PasswordResetRequestSerializer)
    def password_reset_request(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": "Лист для відновлення паролю відправлено"}, 
            status=status.HTTP_200_OK
        )
    
    @action(detail=False, methods=['post'], url_path='password-reset-confirm', serializer_class=SetNewPasswordSerializer)
    def password_reset_confirm(self, request):
        serializer = SetNewPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            uid = urlsafe_base64_decode(serializer.validated_data['uid']).decode()
            user = CustomUser.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
            return Response({"detail": "Невірний uid"}, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(user, serializer.validated_data['token']):
            return Response({"detail": "Невірний або прострочений токен"}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(serializer.validated_data['new_password'])
        user.save()
        return Response({"detail": "Пароль успішно змінено"}, status=status.HTTP_200_OK)
    
class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        # print('-------working login--------')

        recaptcha_token = request.data.get("recaptcha_token")
        if not recaptcha_token:
            return Response({"detail": "Missing reCAPTCHA token"}, status=400)

        result = verify_recaptcha(recaptcha_token)
        if not result.get("success") or result.get("score", 0) < 0.5:
            return Response({"detail": "Invalid reCAPTCHA"}, status=400)

        serializer = self.get_serializer(data=request.data)
        # print("-----data server------", serializer)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            return Response({"detail": "Invalid credentials"}, status=401)

        return Response(serializer.validated_data, status=status.HTTP_200_OK)
