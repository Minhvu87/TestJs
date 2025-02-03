document.getElementById('fetchButton').addEventListener('click', async () => {
    const dataList = document.getElementById('dataList');
    const message = document.getElementById('message');

    try {
        const response = await fetch('http://localhost:3000/data');
        const data = await response.json();

        if (data.length === 0) {
            dataList.innerHTML = '<div>No data available</div>';
        } else {
            dataList.innerHTML = data.map(item => `<div>${item.name}</div>`).join('');
        }

        message.style.display = 'block';

        // Add sparkle effect
        dataList.querySelectorAll('div').forEach(div => {
            div.style.animation = 'sparkle 1s infinite alternate';
        });
    } catch (err) {
        console.error('Error fetching data:', err);
        dataList.innerHTML = '<div>Error fetching data. Please try again later.</div>';
        message.style.display = 'none';
    }
});
