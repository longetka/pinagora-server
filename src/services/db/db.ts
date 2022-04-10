import * as firestore from 'firebase-admin/firestore';

const db = firestore.getFirestore();

class DataBase {
    constructor(public collectionName: string) {
        this.collectionName = collectionName;
    }

    public async addDoc(docName: any, object: Object) {
        let docRef = db.collection(this.collectionName).doc(docName);
        await docRef.set(object);
    }

    public async getDocByEmail(email: any): Promise<any> {
        let userDoc = db.collection(this.collectionName).doc(email);
        let doc = await userDoc.get();
        if (!doc.exists) {
            console.log('No such document!')
        } else {
            return doc.data();
        }
    }        

    public async updateDoc(email: any, ...data: any): Promise<any> {
        let userDoc = db.collection(this.collectionName).doc(email);
        let doc = await userDoc.set(data);
    }
};

export default DataBase;
