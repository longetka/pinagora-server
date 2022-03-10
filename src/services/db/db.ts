import * as firestore from 'firebase-admin/firestore';

const db = firestore.getFirestore();

class DataBase {
    constructor(public collectionName: string) {
        this.collectionName = collectionName;
    }

    public async add(object: Object) {
        let docRef = db.collection(this.collectionName).doc();
        await docRef.set(object);
    }
};

export default DataBase;
