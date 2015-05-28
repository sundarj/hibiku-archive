var frag = document.createDocumentFragment();
rsn.editor.btn = nest.qs('.rsn-btn');

function getSelectionStart() {
    try {
        var node = rangy.getSelection().anchorNode;
        return (node.nodeType == 3 ? node.parentNode : node); 
    } catch(e) {}
}

function create_fields(anchor, content) {
    
    var exists = nest.qs('rsn-field-container');
    
    var container = document.createElement('div');
    container.className = 'rsn-field-container';

    var field;
    var label = document.createElement('label');
    label.className = 'rsn-editor-label';
    container.appendChild(label);

    if (anchor.indexOf("area")+1) {
        field = document.createElement('textarea');
        container.appendChild(field);
        rsn.editor.main = rsn.editor.init(field); /* see editor.js */
        rsn.editor.main.elements[0].innerHTML = content ? content : '';
        rsn.editor.main.elements[0].key().ctrl('s').upon(function() {
            rsn.editor.btn.click();
        });
        
    } else {
        field = document.createElement('input');
        container.appendChild(field);
    }

    field.className = 'rsn-editor-field ' + (anchor.indexOf('area')+1 ? 'rsn-editor-code' : 'rsn-editor-text');
    field.name = field.id = label.htmlFor = field.placeholder = label.innerHTML = anchor.replace(" area", "");
    field.value = content ? content : '';

    frag.appendChild(container);
};

nest.qs('li', function(click) {
  
  nest.qs('.rsn-field-container').forEach(function(container) {
    container.parentNode.removeChild(container);
  });
  
  nest.qs('#page-hidden-field').value = this.textContent;

  r("post", "io", this.textContent, function() {
    var res = JSON.parse(this.responseText);
    for (var anchor in res.content) {
      create_fields(anchor, res.content[anchor]);
    };
    rsn.editor.form.appendChild(frag);
  });
});

window.listen('load', function() {
  if (location.search)
    document.querySelector('[data-page="(page)"]'.replace('(page)', location.search.slice(1).split('p=')[1])).click();
});

rsn.editor.form.listen('submit', function(e) {
  e.preventDefault();
  var data = {};
  data.page = nest.qs('#page-hidden-field').value;
  nest.qs('.rsn-editor-field').forEach(function(field) {
    data[field.name] = field.value
  });
  r("post", this.action, JSON.stringify(data), function(){}, 'json');
});