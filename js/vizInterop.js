function vizRender(graphvizText) {
    var viz = new Viz();

    //viz.renderSVGElement(graphvizText)
    viz.renderSVGElement(graphvizText)
        .then(function (element) {
            updateVizWithPanZoom(element);
        })
        .catch(error => {
            // Create a new Viz instance (@see Caveats page for more info)
            viz = new Viz();

            appendError(error);
        });

}

function appendError(errorMessage) {
    cleanOutput();
    var graph = document.querySelector("#output");

    cleanGraph(graph);

    var newError = document.createElement("error");
    newError.innerHTML = errorMessage;

    graph.appendChild(newError);

}

function cleanGraph(graph) {

    var oldError = graph.querySelector("error");
    if (oldError) {
        graph.removeChild(oldError);
    }

    var oldSvg = graph.querySelector("svg");
    if (oldSvg) {
        graph.removeChild(oldSvg);
    }

}

function updateVizWithPanZoom(svg) {

    var graph = document.querySelector("#output");

    cleanGraph(graph);

    svg.id = 'svg';
    graph.appendChild(svg);


    panZoom = svgPanZoom(svg, {
        zoomEnabled: true,
        controlIconsEnabled: true,
        fit: true,
        center: true,
        minZoom: 0.1
    });


    svg.addEventListener('paneresize', function (e) {
        panZoom.resize();
    }, false);
    window.addEventListener('resize', function (e) {
        panZoom.resize();
    });

    return svg
}


function cleanOutput() {
    let oldOutput = document.querySelector("#output");
    

    var oldErrors = output.querySelectorAll("error");
    if (oldOutput) {
        for(let i = 0; i < oldErrors.length; i++) {
            oldOutput.removeChild(oldErrors[i]);
        }
    }


    var oldMessages = output.querySelectorAll("message");
    if (oldOutput) {
        for(let i = 0; i < oldMessages.length; i++) {
            oldOutput.removeChild(oldMessages[i]);
        }
    }
}

function appendMessage(message) {
    cleanOutput();
    var graph = document.querySelector("#output");

    cleanGraph(graph);

    var newMessage = document.createElement("message");
    newMessage.innerHTML = message;

    graph.appendChild(newMessage);

}


