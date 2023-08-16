import React, { useEffect, useState } from 'react';
import './PlansScreen.css';
import db from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';

function PlansScreen() {

    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);


    useEffect( () => {
        db.collection('customers')
        .doc(user.uid)
        .collection('subscriptions')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach( async subscription => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds
                })
            } )
        })
    }, [user.uid] )


    useEffect( () => {
        db.collection('products')
        .where('active', '==', true)
        .get().then(querySnapshot => {
            const products = {};
            querySnapshot.forEach( async productDoc => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection
                ('prices').get();
                priceSnap.docs.forEach( price => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    }
                } )
            } )
            setProducts(products);
        });
    }, [] );

    console.log('list of products: ', products);
    console.log('subscription: ', subscription);

    const loadCheckout = async (priceId) => {
        const docRef = await db.collection('customers')
        .doc(user.uid).collection('checkout_sessions')
        .add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin
        });

        docRef.onSnapshot(async(snap) => {
            const { error, sessionId } = snap.data();

            if(error) {
                //TODO: Show an error popup
                alert(`An error occured: ${error.message}`);
            }

            if(sessionId) {
                //We have a session, let's redirect to checkout
                
                const stripe = await loadStripe('pk_test_51NfJHfSJGqWEtkL1FQTqGFFbTajLmSjYfQIPivddiDmaqdx6sIsuQAfdJajat8PBkmmlSRjJySlOCNL4Z4aY1Hzi00VQDw08wU')
                stripe.redirectToCheckout({ sessionId });
            }
        })
    }

  return (
    <div className='plansScreen'>
        <br />
        { subscription && (
            <p>Current plan is valid till: {new Date(subscription?.current_period_end *1000).toLocaleDateString()}</p>
        ) }
        {Object.entries(products).map(([productId, productData]) => {
            // TODO: add some logic to check if the user subscription is active...

            const isCurrentPackgae = productData.name?.toLowerCase().includes(subscription?.role)

            return (
                <div key={productId} className={`${isCurrentPackgae && 'plansScreen__plan--disabled' } plansScreen__plan`}>
                    <div className='plansScreen __info'>
                        <h5 className='PlanScreen__planName'>{productData.name}</h5>
                        <h6 className='planScreen__planDescription'>{productData.description}</h6>
                    </div>

                    <button 
                        onClick={ () => 
                            !isCurrentPackgae && loadCheckout(productData?.prices?.priceId)
                            }
                    >
                        { isCurrentPackgae ? 'Current Plan' : 'Subscribe' }
                    </button>
                </div>
            )
        } )}
    </div>
  )
}

export default PlansScreen