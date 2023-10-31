        mainDiv = document.getElementById("mainDiv");
        /**
         * Create new dom text elements
         * @param text a string that contains the text that we want to put in the div
         */
        function divWithText(text) {
            let div = document.createElement("div");
            let textNode = document.createTextNode(text);
            div.appendChild(textNode);
            return div;
        }

        /**
         * Creates a new div node that renders the nubmer as text. The node 
         * has an update function which can be used to update the position and
         * color of the node on the screen. 
         * @param v a number that's rendered within the div.
         */ 
        function numberText(v) {
            let node = divWithText(String(Math.floor(v)));
            // here we add a new update function to the node.
            // It takes the previous v and adds 'delta' to it.
            /**
             * The update function takes the previous value of the node and adds 
             * `dleta` to it. The resulting value is used for styling/positioning. 
             * @param delta a delta for how much to change the value
             */ 
            node.update = function (delta) {
                v += delta;
                node.textContent = String(Math.floor(v));
                let x = v % 800;
                let y = v % 50;
                node.setAttribute("style",
                    `position:absolute; \ 
                left: ${x}px; \
                top: ${y % 50}px; \
                color: hsl(${x % 255}, 100%, 50%)`);
            };
            node.update(0);
            return node;
        }

        /**
         *  Updating all nodes with a delta of 1.
         */ 
        function tick() {
            for (let node of nodes) {
                node.update(1);
            }
        }

        /**
         * A self-calling, recursive function that runs the animation
         */
        function tickForever() {
            tick();
            // a recursive call to this function executed by the browser on repaint
            window.requestAnimationFrame(tickForever);
        }

        // initializing the nodes
        nodes = [];
        for (let i = 0; i < 400; i += 30) {
            let node = numberText(i);
            mainDiv.appendChild(node);
            nodes.push(node);
            if (i === 0)
                console.log(node);
        }

        tickForever();

    // if we did this in a while(true) loop it would run forever and eventually
    // crash your browser, never showing you a result
    //    while (true) {
    //        tick();
    //    }