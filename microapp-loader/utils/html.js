/**
 * Html
 * This Html.ts file acts as a template that we insert all our generated
 * application code into before sending it to the client as regular HTML.
 * Note we're returning a template string from this function.
 */
const html = ({ body }) => `<div id='header'>${body}</div>`;

module.exports = html;
