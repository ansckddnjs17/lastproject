const host = "http://127.0.0.1:80";

// 방명록 데이터를 서버로 전송하는 함수
function submitGuestbookEntry(name, message) {
    axios.post(`${host}/intro`, {
        name: name,
        message: message
    })
    .then(response => {
        console.log('방명록 작성 성공:', response.data);
        alert('방명록이 성공적으로 작성되었습니다!');
        // 새 항목을 페이지에 추가
        loadGuestbookEntries(); // 전체 항목을 다시 불러옵니다.
    })
    .catch(error => {
        console.error('방명록 작성 실패:', error);
        alert('방명록 작성에 실패했습니다. 다시 시도해주세요.');
    });
}

// 방명록 항목을 페이지에 추가하는 함수
function addGuestbookEntryToPage(name, message, timestamp) {
    const entriesList = document.getElementById('guestbook-entries');
    const entryItem = document.createElement('li');
    entryItem.className = 'guestbook-entry';
    entryItem.innerHTML = `<strong>${name}</strong><p>${message}</p><small>${new Date(timestamp).toLocaleString()}</small>`;
    entriesList.prepend(entryItem); // 새 항목을 목록의 맨 위에 추가
}

// 서버에서 방명록 항목을 가져와 페이지에 표시하는 함수
function loadGuestbookEntries() {
    axios.get(`${host}/intro`)
    .then(response => {
        const entries = response.data.intro;
        const entriesList = document.getElementById('guestbook-entries');
        entriesList.innerHTML = ''; // 기존 항목을 초기화합니다.
        entries.forEach(entry => {
            addGuestbookEntryToPage(entry.name, entry.message, entry.timestamp);
        });
    })
    .catch(error => {
        console.error('방명록 항목 로드 실패:', error);
    });
}

// 폼 제출 이벤트 핸들러
document.getElementById('guestbook-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 폼 제출 기본 동작 방지

    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    // 방명록 데이터를 전송
    submitGuestbookEntry(name, message);

    // 폼 초기화
    document.getElementById('guestbook-form').reset();
});

// 페이지가 로드될 때 방명록 항목을 로드
document.addEventListener('DOMContentLoaded', function() {
    loadGuestbookEntries();
});
