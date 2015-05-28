<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Editor</title>
    <link rel="stylesheet" href="use/css/base.css">
    <link rel="stylesheet" href="use/css/editor.css">
</head>
<body>
  
    <main>

        <aside class="rsn-sidebar">
            <header class="rsn-header">
                <h1>Editor</h1>
            </header>

            <ul class="file-list">
            {{#each files}}
                <li class="file" data-page="{{this}}">{{this}}</li>
            {{/each}}
            </ul>

        </aside>

        <form class="rsn-editor-form" action="io/post" method="post">
            <div class="rsn-editor"></div>
            <input type="hidden" id="page-hidden-field" name="page">
            <div class="rsn-btn-container">
                <button type="submit" class="rsn-btn">Save</button>
            </div>
        </form>

    </main>

<script src="use/js/nest.js"></script>
<script src="use/js/editor.js"></script>
<script src="use/js/fields.js"></script>
    
</body>
</html>