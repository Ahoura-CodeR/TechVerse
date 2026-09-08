import { isFooter } from "./component/footer/footer.js";
import { productCategory } from "/ThchVerse/js/component/products-box/products.js"


const getProducts = async () => {

    try {
        const res = await fetch(`/ThchVerse/Data/products.json`)
        if (!res.ok) throw new Error('خطا در دریافت اطلاعات ')
        const data = await res.json()
        return data.products || []
    } catch (error) {
        console.log('your error ==> ' + error);
        return []
        
    }

}

window.customElements.define('product-category', productCategory)
window.customElements.define("footer-site", isFooter)


let currentPage = 1;
const itemPerPage = 10;
let totalPage = 0;
let allItems = [];

// ۱. دریافت محصولات
allItems = await getProducts();
totalPage = Math.ceil(allItems.length / itemPerPage);

console.log('📦 تعداد کل محصولات:', allItems.length);
console.log('📄 تعداد کل صفحات:', totalPage);

// ۲. تابع رندر کردن صفحه
function renderPage(page) {
    const startIndex = (page - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    const currentItems = allItems.slice(startIndex, endIndex);
    
    console.log(`📄 صفحه ${page}: آیتم‌های ${startIndex} تا ${endIndex}`);
    // اینجا currentItems رو رندر کن
    // renderProducts(currentItems);
}

// ۳. ساختن دکمه‌های صفحه‌بندی
function createPaginationButtons() {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = ''; // پاک کردن قبلی‌ها

    // دکمه قبلی
    const prevBtn = document.createElement('button');
    prevBtn.className = 'pagination-arrow previous';
    prevBtn.textContent = '‹';
    paginationContainer.appendChild(prevBtn);

    // دکمه‌های صفحه
    for (let i = 1; i <= totalPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = 'pagination-page' + (i === currentPage ? ' active' : '');
        pageBtn.textContent = i;
        paginationContainer.appendChild(pageBtn);
    }

    // دکمه بعدی
    const nextBtn = document.createElement('button');
    nextBtn.className = 'pagination-arrow next';
    nextBtn.textContent = '›';
    paginationContainer.appendChild(nextBtn);

    // ذخیره دکمه‌ها برای استفاده بعدی
    window.pageButtons = paginationContainer.querySelectorAll('.pagination-page');
}

// ۴. رویدادهای صفحه‌بندی
const paginationContainer = document.querySelector('.pagination');

paginationContainer.addEventListener('click', (event) => {
    // کلیک روی دکمه صفحه
    if (event.target.closest('.pagination-page')) {
        const page = event.target.closest('.pagination-page');
        currentPage = parseInt(page.textContent.trim());
        
        // به‌روزرسانی کلاس‌ها
        document.querySelectorAll('.pagination-page').forEach(btn => btn.classList.remove('active'));
        page.classList.add('active');
        
        renderPage(currentPage);
        console.log(`📄 رفت به صفحه ${currentPage}`);
    }
    
    // کلیک روی قبلی/بعدی
    if (event.target.closest('.pagination-arrow')) {
        const isPrevious = event.target.closest('.previous');
        const activePage = document.querySelector('.pagination-page.active');
        if (!activePage) return;

        if (isPrevious) {
            if (currentPage > 1) {
                currentPage--;
                const prevPage = activePage.previousElementSibling;
                if (prevPage) {
                    activePage.classList.remove('active');
                    prevPage.classList.add('active');
                    renderPage(currentPage);
                }
            }
        } else {
            if (currentPage < totalPage) {
                currentPage++;
                const nextPage = activePage.nextElementSibling;
                if (nextPage) {
                    activePage.classList.remove('active');
                    nextPage.classList.add('active');
                    renderPage(currentPage);
                }
            }
        }
        console.log(`📄 رفت به صفحه ${currentPage}`);
    }
});

// ۵. اجرا
renderPage(currentPage);
createPaginationButtons();