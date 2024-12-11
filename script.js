const participants = []; // 儲存所有參與者名字的陣列

// 新增參與者到名單
document.getElementById('addParticipant').addEventListener('click', () => {
    const input = document.getElementById('participantInput'); // 輸入框元素
    const name = input.value.trim(); // 去掉多餘的空白

    // 檢查名字是否有效
    if (!name) {
        alert('請輸入有效的名字');
        return;
    }

    // 檢查名字是否已存在於名單中
    if (participants.includes(name)) {
        alert('名字已存在');
        input.value = ''; // 清空輸入框
        input.focus(); // 將焦點返回到輸入框
        return;
    }

    // 新增名字到參與者陣列
    participants.push(name);

    // 更新 UI 顯示新增的參與者
    const participantList = document.getElementById('participantList'); // 名單顯示區域
    const listItem = document.createElement('p'); // 建立新的段落元素
    listItem.className = 'text-center bg-red-400 p-2 rounded font-bold'; // 設定樣式
    listItem.textContent = name; // 設定內容為新增的名字
    participantList.appendChild(listItem); // 新增到顯示區域

    input.value = ''; // 清空輸入框
    input.focus(); // 將焦點返回到輸入框
});

// 生成交換名單
document.getElementById('generate').addEventListener('click', () => {
    // 檢查是否有足夠的參與者
    if (participants.length < 2) {
        alert('請至少加入兩位參與者');
        return;
    }

    // 呼叫交換邏輯生成配對結果
    const result = generateExchange(participants);

    // 顯示生成的結果
    const resultList = document.getElementById('resultList'); // 結果顯示區域
    resultList.innerHTML = ''; // 清空舊的結果
    result.forEach(pair => {
        const resultItem = document.createElement('div'); // 建立結果項目
        resultItem.className = 'bg-gray-800 py-2 rounded shadow text-center font-bold'; // 設定樣式
        resultItem.textContent = `${pair.giver} → ${pair.receiver}`; // 顯示配對內容
        resultList.appendChild(resultItem); // 新增到結果區域
    });
});

// 重置參與者名單與結果
document.getElementById('reset').addEventListener('click', () => {
    participants.length = 0; // 清空參與者陣列

    // 清空名單 UI
    const participantList = document.getElementById('participantList');
    participantList.innerHTML = '';

    // 清空結果 UI
    const resultList = document.getElementById('resultList');
    resultList.innerHTML = '';
});

// 生成交換配對的函數
function generateExchange(participants) {
    const shuffledParticipants = [...participants]; // 複製參與者名單以避免直接修改原陣列

    // 使用 Fisher-Yates 洗牌演算法隨機排列參與者
    for (let i = shuffledParticipants.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // 隨機選擇索引
        // 交換元素位置
        [shuffledParticipants[i], shuffledParticipants[j]] = [
            shuffledParticipants[j],
            shuffledParticipants[i],
        ];
    }

    const pairs = []; // 儲存配對結果
    // 根據洗牌後的順序，生成環形配對
    for (let i = 0; i < shuffledParticipants.length; i++) {
        const giver = shuffledParticipants[i]; // 給禮物的人
        const receiver = shuffledParticipants[(i + 1) % shuffledParticipants.length]; // 接受禮物的人（環形指向下一個）
        pairs.push({ giver, receiver }); // 儲存配對
    }

    return pairs; // 返回配對結果
}
