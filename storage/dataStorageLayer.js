'use strict';

const { CODES, MESSAGES } = require('./statusCodes');

const {
    getAllFromStorage,
    getFromStorage,
    addToStorage,
    updateStorage,
    removeFromStorage
} = require('./storageLayer');

//Datastorage class

module.exports = class Datastorage {
    get CODES() {
        return CODES;
    }

    getAll() {
        return getAllFromStorage();
    } //end getAll

    getOne(id) {
        return new Promise(async (resolve, reject) => {
            if (!id) {
                reject(MESSAGES.NOT_FOUND('---empty---'));
            }
            else {
                const result = await getFromStorage(id);
                if (result) {
                    resolve(result);
                }
                else {
                    reject(MESSAGES.NOT_FOUND(id));
                }
            }
        });
    } //end of getOne

    insert(book) {
        return new Promise(async (resolve, reject) => {
            if (book) {
                if (!book.bookID) {
                    reject(MESSAGES.NOT_INSERTED());
                }
                else if (await getFromStorage(book.bookID)) {
                    reject(MESSAGES.ALREADY_IN_USE(book.bookID));
                }
                else if (await addToStorage(book)) {
                    resolve(MESSAGES.INSERT_OK(book.bookID));
                }
                else {
                    reject(MESSAGES.NOT_INSERTED());
                }
            }
            else {
                reject(MESSAGES.NOT_INSERTED());
            }
        });
    } //end of insert

    update(book) {
        return new Promise(async (resolve, reject) => {
            if (book) {
                if (await updateStorage(book)) {
                    resolve(MESSAGES.UPDATE_OK(book.bookID));
                }
                else {
                    reject(MESSAGES.NOT_UPDATED());
                }
            }
            else {
                reject(MESSAGES.NOT_UPDATED());
            }
        });
    } //end update

    remove(id) {
        return new Promise(async (resolve, reject) => {
            if (!id) {
                reject(MESSAGES.NOT_FOUND('---empty---'));
            }
            else if (await removeFromStorage(id)) {
                resolve(MESSAGES.REMOVE_OK(id));
            }
            else {
                reject(MESSAGES.NOT_REMOVED(id));
            }
        });
    } //end of remove
};