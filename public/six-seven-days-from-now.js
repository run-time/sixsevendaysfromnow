class SixSevenDaysFromNow extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.loadEvents();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                :host {
                    display: block;
                    font-family: sans-serif;
                    color: #333;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    background: white;
                    border-radius: 20px;
                    padding: 40px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                }

                .header {
                    text-align: center;
                    margin-bottom: 30px;
                    padding-bottom: 30px;
                    border-bottom: 3px dotted #764ba2;
                }

                .countdown {
                    color: #368dda;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 15px;
                    flex-wrap: nowrap;
                }

                .days-number {
                    font-size: clamp(60px, 15vw, 120px);
                    font-weight: 900;
                    background: linear-gradient(135deg, #368dda 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    line-height: 1;
                }

                .days-text {
                    font-size: clamp(18px, 3vw, 24px);
                    color: #aaa;
                }

                .date-text {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                }

                .date-text .days-text {
                    font-size: 20px;
                }

                .date-text strong {
                    font-size: 32px;
                    color: #368dda;
                    font-weight: 400;
                }

                .section-title {
                    font-size: 32px;
                    color: #764ba2;
                    margin-bottom: 30px;
                    text-align: center;
                    font-weight: 100;
                }

                .loading {
                    text-align: center;
                    font-size: 20px;
                    color: #666;
                    padding: 40px;
                }

                .events-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                    gap: 20px;
                    margin-top: 15px;
                    transition: opacity 0.3s ease, margin-top 0.3s ease;
                    opacity: 1;
                }

                .events-list.collapsed {
                    display: none;
                }

                .event-category {
                    margin-bottom: 30px;
                }

                .category-title {
                    font-size: 24px;
                    color: #ffffff;
                    background: #764ba2;
                    padding: 15px 20px;
                    padding-left: 15px;
                    font-weight: 600;
                    cursor: pointer;
                    user-select: none;
                    transition: all 0.3s ease;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: relative;
                }

                .category-title::after {
                    content: '';
                    width: 12px;
                    height: 12px;
                    border-right: 2px solid currentColor;
                    border-bottom: 2px solid currentColor;
                    transform: rotate(45deg);
                    transition: transform 0.3s ease;
                    margin-left: 10px;
                }

                .category-title.collapsed {
                    color: #764ba2;
                    background: transparent;
                }

                .category-title.collapsed::after {
                    transform: rotate(-45deg);
                }

                .event-item {
                    background: #f8f9fa;
                    padding: 20px;
                    border-radius: 8px;
                    border: 2px solid #e0e0e0;
                    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    height: fit-content;
                }

                .event-item:hover {
                    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.15);
                    border-color: #764ba2;
                }

                .event-image {
                    width: 100%;
                    max-height: 300px;
                    object-fit: contain;
                    border-radius: 6px;
                    order: -1;
                }

                .event-content {
                    flex: 1;
                }

                .event-year {
                    font-size: 18px;
                    font-weight: 700;
                    color: #368dda;
                    margin-bottom: 8px;
                }

                .event-text {
                    font-size: 16px;
                    line-height: 1.6;
                    color: #555;
                }

                .event-links {
                    margin-top: 10px;
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .event-link {
                    display: inline-block;
                    padding: 5px 12px;
                    background: #368dda;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    font-size: 14px;
                    transition: background 0.2s;
                }

                .event-link:hover {
                    background: #764ba2;
                }

                .error {
                    text-align: center;
                    color: #d32f2f;
                    padding: 40px;
                    font-size: 18px;
                }

                @media (max-width: 768px) {
                    .days-number {
                        font-size: 80px;
                    }

                    .date-text {
                        font-size: 24px;
                    }

                    .container {
                        padding: 15px;
                        border-radius: 10px;
                    }

                    .header {
                        margin-bottom: 30px;
                        padding-bottom: 20px;
                    }

                    .section-title {
                        font-size: 20px;
                        margin-bottom: 20px;
                    }

                    .category-title {
                        font-size: 18px;
                        padding: 12px 15px;
                        word-wrap: break-word;
                    }

                    .events-list {
                        grid-template-columns: 1fr;
                    }

                    .event-item {
                        padding: 15px;
                    }

                    .event-image {
                        max-height: 250px;
                    }

                    .event-year {
                        font-size: 16px;
                    }

                    .event-text {
                        font-size: 14px;
                        word-wrap: break-word;
                        overflow-wrap: break-word;
                    }

                    .event-link {
                        font-size: 12px;
                        padding: 4px 10px;
                    }
                }
            </style>

            <div class="container">
                <div class="header">
                    <div class="countdown">
                        <div class="days-number">67</div>
                    </div>
                    <div class="date-text">
                        <span class="days-text">days from now will be</span>
                        <div>
                            <strong id="futureDate">Sunday January 25 2026</strong>
                        </div>
                    </div>
                </div>

                <div class="section-title">This day in history...</div>

                <div id="content">
                    <div class="loading">Loading historical events...</div>
                </div>
            </div>
        `;
    }

    // Calculate the date 67 days from now
    getFutureDate() {
        const today = new Date();
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + 67);
        return futureDate;
    }

    // Format the date nicely
    formatDate(date) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
        
        const dayName = days[date.getDay()];
        const monthName = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        
        return `${dayName} ${monthName} ${day} ${year}`;
    }

    // Get storage key for a specific date
    getStorageKey(month, day) {
        return `sixseven_events_${month}_${day}`;
    }

    // Get current date key for cleanup
    getCurrentDateKey() {
        const today = new Date();
        return `current_date_${today.getFullYear()}_${today.getMonth()}_${today.getDate()}`;
    }

    // Clean up old localStorage entries
    cleanupOldStorage(currentKey) {
        const storedCurrentDate = localStorage.getItem('sixseven_current_date');
        
        // If it's a new day, clear old event data
        if (storedCurrentDate !== currentKey) {
            // Remove all old event entries
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('sixseven_events_')) {
                    localStorage.removeItem(key);
                    i--; // Adjust index since we removed an item
                }
            }
            // Update current date marker
            localStorage.setItem('sixseven_current_date', currentKey);
        }
    }

    // Load events from cache or API
    async loadEvents() {
        const futureDate = this.getFutureDate();
        const month = String(futureDate.getMonth() + 1).padStart(2, '0');
        const day = String(futureDate.getDate()).padStart(2, '0');
        
        // Update the date in the header
        const futureDateElement = this.shadowRoot.getElementById('futureDate');
        futureDateElement.textContent = this.formatDate(futureDate);
        
        // Clean up old storage entries
        const currentDateKey = this.getCurrentDateKey();
        this.cleanupOldStorage(currentDateKey);
        
        // Check localStorage first
        const storageKey = this.getStorageKey(month, day);
        const cachedData = localStorage.getItem(storageKey);
        
        if (cachedData) {
            try {
                const data = JSON.parse(cachedData);
                this.displayEvents(data);
                return;
            } catch (e) {
                console.error('Error parsing cached data:', e);
                localStorage.removeItem(storageKey);
            }
        }
        
        // If no cache or cache is invalid, fetch from API
        const apiUrl = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`;
        
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            
            const data = await response.json();
            
            // Save to localStorage
            localStorage.setItem(storageKey, JSON.stringify(data));
            
            this.displayEvents(data);
        } catch (error) {
            const contentDiv = this.shadowRoot.getElementById('content');
            contentDiv.innerHTML = `<div class="error">Error loading events: ${error.message}</div>`;
        }
    }

    // Display events by category
    displayEvents(data) {
        const contentDiv = this.shadowRoot.getElementById('content');
        contentDiv.innerHTML = '';
        
        const categories = [
            { key: 'holidays', title: 'Holidays & Observances' },
            { key: 'births', title: 'Notable Births' },
            { key: 'deaths', title: 'Notable Deaths' },
            { key: 'events', title: 'Historical Events' }
        ];
        
        categories.forEach((category, index) => {
            if (data[category.key] && data[category.key].length > 0) {
                const categoryDiv = document.createElement('div');
                categoryDiv.className = 'event-category';
                
                const categoryTitle = document.createElement('div');
                categoryTitle.className = 'category-title';
                categoryTitle.textContent = category.title;
                
                // Collapse all sections except the first one (holidays)
                if (index > 0) {
                    categoryTitle.classList.add('collapsed');
                }
                
                // Add click handler for accordion functionality
                categoryTitle.addEventListener('click', function() {
                    this.classList.toggle('collapsed');
                    const eventsList = this.nextElementSibling;
                    eventsList.classList.toggle('collapsed');
                });
                
                categoryDiv.appendChild(categoryTitle);
                
                const eventsList = document.createElement('div');
                eventsList.className = 'events-list';
                
                // Collapse all sections except the first one (holidays)
                if (index > 0) {
                    eventsList.classList.add('collapsed');
                }
                
                    // Sort events: items with images first, items without images last
                    const sortedEvents = [...data[category.key]].sort((a, b) => {
                        const aHasImage = a.pages && a.pages.length > 0 && a.pages[0].thumbnail;
                        const bHasImage = b.pages && b.pages.length > 0 && b.pages[0].thumbnail;
                        
                        if (aHasImage && !bHasImage) return -1;
                        if (!aHasImage && bHasImage) return 1;
                        return 0;
                    });
                
                    sortedEvents.forEach(event => {
                        const eventItem = document.createElement('div');
                        eventItem.className = 'event-item';
                        
                        const contentDiv = document.createElement('div');
                        contentDiv.className = 'event-content';
                        
                        if (event.year) {
                            const yearDiv = document.createElement('div');
                            yearDiv.className = 'event-year';
                            yearDiv.textContent = event.year;
                            contentDiv.appendChild(yearDiv);
                        }
                        
                        const textDiv = document.createElement('div');
                        textDiv.className = 'event-text';
                        textDiv.textContent = event.text;
                        contentDiv.appendChild(textDiv);
                        
                        if (event.pages && event.pages.length > 0) {
                            const linksDiv = document.createElement('div');
                            linksDiv.className = 'event-links';
                            
                            event.pages.forEach(page => {
                                const link = document.createElement('a');
                                link.className = 'event-link';
                                link.href = page.content_urls.desktop.page;
                                link.target = '_blank';
                                link.textContent = page.titles.normalized;
                                linksDiv.appendChild(link);
                            });
                            
                            contentDiv.appendChild(linksDiv);
                        }
                        
                        eventItem.appendChild(contentDiv);
                        
                        // Add image to the right if available
                        if (event.pages && event.pages.length > 0 && event.pages[0].thumbnail) {
                            const img = document.createElement('img');
                            img.className = 'event-image';
                            img.src = event.pages[0].thumbnail.source;
                            img.alt = event.pages[0].titles.normalized;
                            eventItem.appendChild(img);
                        }
                        
                        eventsList.appendChild(eventItem);
                    });                categoryDiv.appendChild(eventsList);
                contentDiv.appendChild(categoryDiv);
            }
        });
    }
}

// Define the custom element
customElements.define('six-seven-days-from-now', SixSevenDaysFromNow);
