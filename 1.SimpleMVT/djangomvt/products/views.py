from django.shortcuts import render, redirect
from django.forms import modelformset_factory
from .models import Product, ProductImage
from .forms import ProductForm, ProductImageForm

# Create your views here.
def show_products(request):
    products = Product.objects.prefetch_related("images").all()
    return render(request, 'products.html', {'products': products})

def add_product(request):
    ImageFormSet = modelformset_factory(ProductImage, form=ProductImageForm, extra=3, can_delete=False)

    if request.method == "POST":
        form = ProductForm(request.POST)
        formset = ImageFormSet(request.POST, request.FILES, queryset=ProductImage.objects.none())
        if form.is_valid() and formset.is_valid():
            product = form.save()

            for image_form in formset:
                if image_form.cleaned_data.get("image"):
                     #print(image_form)
                     img = image_form.save(commit=False)
                     img.product = product
                     img.save()

            return redirect("products:show_products")  # назва URL на список товарів
    else:
        form = ProductForm()
        formset = ImageFormSet(queryset=ProductImage.objects.none())

    return render(request, "add_product.html", {"form": form, "formset": formset})