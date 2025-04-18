document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.keyCode == 123) { // F12
        e.preventDefault();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.keyCode === 85 || e.keyCode === 83 || e.keyCode === 73)) {
        e.preventDefault();
        return false;
    }
});