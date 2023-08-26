import cardService from '../src/card/service';
const CardService = new cardService();
describe('Test card Service',()=>{
    test('generateToken',async ()=>{
        
        const token = await CardService['generateToken']();
        expect(token).toHaveLength(16);
        expect(token).toMatch(new RegExp('^[a-zA-Z0-9]+$'));
        expect(typeof token).toBe("string");
    }),
    
    test('datedCheck true',async ()=>{
        
        const dated = await CardService['datedCheck']({
            saveDate:  new Date("2023-04-12T16:40:34.240Z")},
          );

          expect(dated).toBe(true);
    })
    test('datedCheck false',async ()=>{
        const now = new Date();
        const dated = await CardService['datedCheck']({
            saveDate: new Date(now.getTime()+ 600000)},
          );

          expect(dated).toBe(false);
    })

})