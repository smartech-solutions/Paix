// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    // List of pages that don't require authentication
    const publicPages = ['index.html', 'loading.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    // Skip check for public pages
    if (publicPages.includes(currentPage)) return;
    
    // Redirect to login if not authenticated
    if (sessionStorage.getItem('authenticated') !== 'true') {
        window.location.href = 'index.html';
    }
});