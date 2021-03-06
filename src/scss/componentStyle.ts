export default `<style>
    :host {
        display: block;
        margin: auto;
        border: 1px solid #d5d5d5;
        align-items: center;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
        border-radius: 3px;
        overflow: hidden;
        padding: 10px;
        box-sizing: border-box;
        font-family: sans-serif;
    }

    table {
        margin: auto;
    }

    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
    }

    th, td {
        padding: 5px;
    }

    .row:first-child {
        background: #FF0
    }

    .row:nth-child(2n) {
        background-color: #FFF;
    }

    .row:nth-child(2n+3) {
        background: #d5d5d5
    }

    .hide {
        visibility: hidden;
    }

    .show {
        visibility: visible;
    }
</style>`
