'use strict';

function adapt(item) {
    return Object.assign(item, {
        bookID: +item.bookID
    });
}

module.exports = { adapt };