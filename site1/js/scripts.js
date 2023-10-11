   function nav() {
            return {
                currentPage: '', // Current page identifier
                content: '',     // Stores the content of the main section
                footerContent: '', // Stores the content of the footer
                changeContent(page, title) {
                    // Fetching the HTML partial based on page parameter and updating the content and title dynamically
                    fetch(`${page}.html`)
                        .then(response => response.text())
                        .then(data => {
                            this.content = data;
                            document.title = title;

                            // Updating the browser history state to reflect the current page
                            window.history.pushState({ path: `${page}.html` }, title, `?page=${page}`);
                            this.currentPage = page; // Updating current page identifier
                        });
                },
                init() { 
                    // Fetching footer content on initialization
                    fetch('footer.html')
                        .then(response => response.text())
                        .then(data => {
                            this.footerContent = data; // Setting footer content
                        });

                    // Parsing URL parameters to get the 'page' parameter
                    const urlParams = new URLSearchParams(window.location.search);
                    const page = urlParams.get('page') || 'home';
                    
                    // Setting initial page title, with a custom title for the home page, If the page variable is equal to 'home', set the title variable to 'Custom Home Title'; otherwise, call the formatTitle method with the page variable as an argument and set the title variable to the returned string.
                    const title = page === 'home' ? "TNT Fencing" : this.formatTitle(page);
                    
                    // Changing content to the appropriate page based on the URL parameter
                    this.changeContent(page, title);
                    
                    // Handling browser navigation events (back/forward) to navigate between pages dynamically
                    window.onpopstate = function(event) {
                        if (event.state) {
                            location.href = `index.html?page=${event.state.path.split('.')[0]}`;
                        } else {
                            location.href = 'index.html';
                        }
                    };
                },
                // Method to format page titles
                formatTitle(page) {
                    return page.charAt(0).toUpperCase() + page.slice(1);
                }
            };
        }
