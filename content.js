
WYSIHTML5_SANDBOX = "wysihtml5-sandbox"

function pasteHtmlAtCaret(isShift) {
    windo = windo || window;
    var sel, range;
    if (windo.getSelection) {
        // IE9 and non-IE
        sel = document.getElementsByClassName(WYSIHTML5_SANDBOX)[0].contentWindow.getSelection();
        console.log(sel);
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            console.log(range);

            // Range.createContextualFragment() would be useful here but is
            // non-standard and not supported in all browsers (IE9, for one)
            var el = windo.document.createElement("ol");

            // Get an LI object and wrap it with OL object
            node = range.commonAncestorContainer;
            if (node.nodeName != "LI")
                node = node.parentNode;

            console.log(node.nodeName);
            if (node.nodeName == "LI")
            {
                range.selectNode(node);
                range.surroundContents(el);
            }

            // Move selection
            sel.removeAllRanges();
            sel.addRange(range);
        }
    } else if (windo.document.selection && windo.document.selection.type != "Control") {
        // IE < 9
        // TODO:
    }
}

function keydown(e)
{
    var TABKEY = 9;
    if(e.keyCode == TABKEY) 
    {
        isShift = e.shiftKey ? true : false;
        if (isShift) console.log('shift');
        pasteHtmlAtCaret(isShift);
        if(e.preventDefault)
        {
            e.preventDefault();
        }
        return false;
    }
    // if (!e) e= event;
    // alert("keydown");
}

function clicked(e)
{
    alert("clicked");
    var wysihtml5 = document.getElementsByClassName(WYSIHTML5_SANDBOX)[0];
    if (wysihtml5)
    {
        doc = wysihtml5.contentWindow.document
        alert(doc);
        if (doc.addEventListener) {
            doc.addEventListener("keydown", keydown, false);
        }
    }
}

function init()
{
    // var target = document.querySelector('head > title');
    var target = document;
    var observer = new window.WebKitMutationObserver(function(mutations, addedListeners) {
        mutations.forEach(function(mutation, addedListeners) {
            // if addedListeners return;
            var wysihtml5 = mutation.target.getElementsByClassName(WYSIHTML5_SANDBOX)[0];
            if (wysihtml5)
            {
                doc = wysihtml5.contentWindow.document
                if (doc.addEventListener) {
                    doc.addEventListener("keydown", keydown, false);
                }
            }
            // console.log('new title:', mutation.target.textContent);
        });
    });
    observer.observe(target, { subtree: true, characterData: true, childList: true });
    
    // var doc = document;
    // if (doc.addEventListener) {
    //     doc.addEventListener("click", clicked, false);
    // } else if (doc.attachEvent) {
    //     doc.attachEvent("onkeydown", keydown);
    // } else {
    //     doc.onkeydown = keydown;
    // }
}

init();