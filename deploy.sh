#!/bin/bash

# Deploy Script untuk GitHub Pages
# Script ini akan membantu Anda setup dan deploy website ke GitHub Pages

echo "🚀 Portfolio Website Deployment Script"
echo "======================================"
echo ""

# Warna untuk output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Fungsi untuk print dengan warna
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Cek apakah git sudah terinstall
if ! command -v git &> /dev/null; then
    print_error "Git tidak terinstall. Silakan install git terlebih dahulu."
    exit 1
fi

print_success "Git ditemukan"

# Cek apakah sudah ada .git directory
if [ -d ".git" ]; then
    print_warning "Repository git sudah diinisialisasi"

    # Cek apakah sudah ada remote
    if git remote get-url origin &> /dev/null; then
        print_info "Remote origin sudah ada: $(git remote get-url origin)"

        read -p "Apakah Anda ingin push perubahan? (y/n): " push_changes
        if [ "$push_changes" = "y" ] || [ "$push_changes" = "Y" ]; then
            echo ""
            print_info "Menambahkan semua file..."
            git add .

            read -p "Masukkan commit message: " commit_msg
            if [ -z "$commit_msg" ]; then
                commit_msg="Update website"
            fi

            git commit -m "$commit_msg"

            print_info "Pushing ke GitHub..."
            git push origin main

            print_success "Perubahan berhasil di-push!"
            print_info "Website akan di-deploy otomatis dalam 1-2 menit"
            print_info "Cek status deployment di: https://github.com/$(git remote get-url origin | sed 's/.*github.com[:/]\(.*\)\.git/\1/')/actions"
        fi
    else
        echo ""
        read -p "Masukkan URL repository GitHub (contoh: https://github.com/idlanyor/bioku.git): " repo_url

        if [ -z "$repo_url" ]; then
            print_error "URL repository tidak boleh kosong"
            exit 1
        fi

        git remote add origin "$repo_url"
        print_success "Remote origin ditambahkan"

        print_info "Menambahkan semua file..."
        git add .

        print_info "Membuat commit pertama..."
        git commit -m "Initial commit: Portfolio website

- Add responsive HTML structure
- Add modern CSS styling with animations
- Add interactive JavaScript features
- Setup GitHub Actions workflow for auto-deployment"

        print_info "Pushing ke GitHub..."
        git branch -M main
        git push -u origin main

        print_success "Website berhasil di-push ke GitHub!"
        echo ""
        print_info "Langkah selanjutnya:"
        echo "1. Buka repository di GitHub"
        echo "2. Pergi ke Settings → Pages"
        echo "3. Di bagian Source, pilih 'GitHub Actions'"
        echo "4. Tunggu deployment selesai (cek di tab Actions)"
        echo "5. Website akan tersedia di: https://$(echo $repo_url | sed 's/.*github.com[:/]\(.*\)\/\(.*\)\.git/\1.github.io\/\2/')"
    fi
else
    echo ""
    print_info "Inisialisasi git repository..."
    git init
    print_success "Git repository diinisialisasi"

    echo ""
    read -p "Masukkan URL repository GitHub (contoh: https://github.com/idlanyor/bioku.git): " repo_url

    if [ -z "$repo_url" ]; then
        print_error "URL repository tidak boleh kosong"
        exit 1
    fi

    git remote add origin "$repo_url"
    print_success "Remote origin ditambahkan"

    print_info "Menambahkan semua file..."
    git add .

    print_info "Membuat commit pertama..."
    git commit -m "Initial commit: Portfolio website

- Add responsive HTML structure
- Add modern CSS styling with animations
- Add interactive JavaScript features
- Setup GitHub Actions workflow for auto-deployment"

    print_info "Pushing ke GitHub..."
    git branch -M main
    git push -u origin main

    echo ""
    print_success "Website berhasil di-push ke GitHub!"
    echo ""
    print_info "Langkah selanjutnya:"
    echo "1. Buka repository di GitHub"
    echo "2. Pergi ke Settings → Pages"
    echo "3. Di bagian Source, pilih 'GitHub Actions'"
    echo "4. Tunggu deployment selesai (cek di tab Actions)"
    echo "5. Website akan tersedia di: https://$(echo $repo_url | sed 's/.*github.com[:/]\(.*\)\/\(.*\)\.git/\1.github.io\/\2/')"
fi

echo ""
print_success "Selesai!"
echo ""
print_info "Untuk update di masa depan, gunakan:"
echo "  git add ."
echo "  git commit -m 'pesan perubahan'"
echo "  git push"
echo ""
print_info "Atau jalankan script ini lagi: ./deploy.sh"