from django.shortcuts import render, redirect, get_object_or_404
from .forms import CategoryForm
from .models import Category

# Create your views here.
def show_categories(request):
    categories = Category.objects.all()
    return render(request, 'categories.html', {'categories': categories})

def add_category(request):
    if request.method == 'POST':
        form = CategoryForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('categories:show_categories')
    else:
        form = CategoryForm()
    return render(request, 'add_category.html', {'form': form})

def edit_category(request, category_id):
    category = get_object_or_404(Category, id=category_id)
    if request.method == 'POST':
        form = CategoryForm(request.POST, request.FILES, instance=category)
        if form.is_valid():
            form.save()
            return redirect('categories:show_categories')
    else:
        form = CategoryForm(instance=category)
    return render(request, 'edit_category.html', {'form': form, 'category': category})

def delete_category(request, category_id):
    category = get_object_or_404(Category, id=category_id)
    if request.method == 'POST':
        if category.image:
            category.image.delete(save=False)
        category.delete()
        return redirect('categories:show_categories')
    return render(request, 'delete_category.html', {'category': category})