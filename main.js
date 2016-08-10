'use strict';
let printReceipt = (inputs) => {
  let allItems = loadAllItems();
  let promotions = loadPromotions();
  let cartItems = countItems(allItems, inputs);
  let newCartItems = countPromotions(cartItems,promotions);
  let receipt = cartList(newCartItems);
  print(receipt);
};

let countItems = (allItems,inputs) => {
  let cartItems = [];

  for(let input of inputs){
    let splittedInputs = input.split('-');
    let barcode = splittedInputs[0];
    let count = parseFloat(splittedInputs[1] || 1);
    let cartItem = cartItems.find(cartItem => cartItem.item.barcode === barcode);

    if(cartItem){
      cartItem.count++;
    }else {
      let item = allItems.find(item => item.barcode === barcode);
      cartItems.push({item:item,count:count});
    }
  }
  return cartItems;
};

let countPromotions = (cartItems,promotions) => {

  let newCartItems = [];
  for(let cartItem of cartItems){
    let barcode = cartItem.item.barcode;
    let promotionTags = promotions[0].barcodes.find(promotion => promotion === barcode);
    let subtotal = cartItem.item.price * cartItem.count;
    let save = 0;
    if(promotionTags){
       save = cartItem.count%2 * cartItem.item.price;
       subtotal = subtotal - save;
    }
    newCartItems.push({cartItem:cartItem,subtotal:subtotal,save:save});
  }
  return newCartItems;
};

let cartList = (newCartItems) => {
  let total = 0;
  let saves = 0;
  let carts = ``;
  let receipt;
  for(let cart of newCartItems){
    total += cart.subtotal;
    saves += cart.save;
    carts += `名称：${cart.cartItem.item.name}，数量：${cart.cartItem.count}${cart.cartItem.item.unit}，单价：${(cart.cartItem.item.price).toFixed(2)}(元)，小计：${(cart.subtotal).toFixed(2)}(元)
`;
  }
  receipt = `***<没钱赚商店>收据***
${carts}----------------------
总计：${total.toFixed(2)}(元)
节省：${saves.toFixed(2)}(元)
**********************`;
  return receipt;
};

let print = (receipt) => {
  console.log(receipt);
};
// let countPromotions = (cartItems,promoptions) => {
//   return cartItems.map(cartItem => {//map查
//     let promotionType = getPromotionType(cartItem.item.barcode,promoptions);//调用函数
//     let {subtotal,save} = discount(cartItem,promotionType);//调用函数
//     return {
//       cartItem:cartItem,
//       subtotal:subtotal,
//       save:save
//     }
//   })
// };//总函数
//
// let getPromotionType = (barcode,promotions) => {
//   let promotion = promotions.find(promotion => promotion.barcodes.includes(barcode)
//   );//includes查
//   return promotion ? promotion.type : '';
// };
//
// let discount = (cartItem,promotionType) => {
//   let freeItemCount = 0;
//   if(promotionType === 'BUY_TWO_GET_ONE_FREE'){
//     freeItemCount = parseInt(cartItem.count / 3);
//   }
//   let save = freeItemCount * cartItem.item.price;
//   let subtotal = cartItem.count * cartItem.item.price - save;
//
//   return {subtotal,save};
// };
// let countPromotions = (cartItems, promotions) => {
//   return cartItems.map(cartItem => {
//     let promotionType = getPromotionType(cartItem.item.barcode, promotions);
//     let {subtotal, save} = discount(cartItem, promotionType);
//     return {
//       cartItem: cartItem,
//       subtotal: subtotal,
//       save: save
//     }
//   });
// };
//
// let getPromotionType = (barcode, promotions) => {
//   let promotion = promotions.find(promotion => promotion.barcodes.includes(barcode));
//   return promotion ? promotion.type : '';
// };
//
// let discount = (cartItem, promotionType) => {
//   let freeItemCount = 0;
//   if (promotionType === 'BUY_TWO_GET_ONE_FREE') {
//     freeItemCount = parseInt(cartItem.count / 3);
//   }
//   let save = freeItemCount * cartItem.item.price;
//   let subtotal = cartItem.item.price * cartItem.count - save;
//   return {subtotal, save};
// };


// let countPromotions = (cartItems,promotions) => {
//   return cartItems.map(cartItem => {
//     let promotionType = getPromotionType(cartItem.item.barcode,promotions);
//     let {subtotal,save} = discount(cartItem,promotionType);
//     return{
//       cartItem:cartItem,
//       subtotal:subtotal,
//       save:save
//     }
//   });
// };
//
// let getPromotionType = (barcode,promotions) => {
//   let promotion = promotions.find(promotion => promotion.barcodes.includes(barcode));
//   return promotion ? promotion.type : '';
// };
//
// let discount = (cartItem,promotionType) => {
//   let freeItemCount = 0;
//   if(promotionType === 'BUY_TWO_GET_ONE_FREE'){
//     freeItemCount = parseInt(cartItem.count / 3);
//   }
//   let save = freeItemCount * cartItem.item.price;
//   let subtotal = cartItem.item.price*cartItem.count - save;
//   return {subtotal,save};
// };

// let countPromotions = (cartItems,promotions) => {
//   return cartItems.map(cartItem => {
//     let promotionType = getPromotionType(cartItem.item.barcode,promotions);
//     let {subtotal,save} = discount(cartItem,promotionType);
//     return {
//       cartItem:cartItem,
//       subtotal:subtotal,
//       save:save
//     };
//   });
// };
//
// let getPromotionType = (barcode,promotions) => {
//   let promotion = promotions.find(promotion => promotion.barcodes.includes(barcode));
//   return promotion ? promotion.type : '';
// };
//
// let discount = (cartItem,promotions) => {
//   let freeItemCount = 0;
//   if(promotions){
//     freeItemCount = parseInt(cartItem.count / 3);
//   }
//   let save = cartItem.item.price * freeItemCount;
//   let subtotal = cartItem.item.price * cartItem.count - save;
//   return {subtotal,save};
// };










































