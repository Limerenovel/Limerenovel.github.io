
const STORAGE_KEY = "scrollPosition";

// 還原捲動位置
window.addEventListener("load", () => {
    const savedPosition = localStorage.getItem(STORAGE_KEY);
    if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition, 10)); // 還原捲動位置
    }
});

// 記錄捲動位置
window.addEventListener("scroll", () => {
    localStorage.setItem(STORAGE_KEY, window.scrollY);
});

// 清除儲存的捲動位置（選擇性）
window.addEventListener("beforeunload", () => {
    // 如果不希望記錄位置，可以在這裡清除
    // localStorage.removeItem(STORAGE_KEY);
});