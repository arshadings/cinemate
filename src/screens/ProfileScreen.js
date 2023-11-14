import React, { useEffect, useState } from 'react';
import './ProfileScreen.css';
import Nav from '../Nav';
import avatar from '../assets/avatar.png';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { auth } from '../firebase';
import PlansScreen from './PlansScreen';
import { loadStripe } from '@stripe/stripe-js';
import db from '../firebase';
import Loader from './Loader';

function ProfileScreen() {

    const activeUser = useSelector(selectUser)

    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState('');
    const [loading, setLoading] = useState(false)

    //console.log('subscription is: ', subscription)


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

    //console.log('list of products: ', products);
    //console.log('subscription: ', subscription);

    const loadCheckout = async (priceId) => {
        setLoading(true)
        console.log("priceId is: ", priceId)
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
                const stripe = await loadStripe('pk_test_51NhbHRSBRaRDtleaDjETzHPAgt0Nj5y0GexElnghLkskCUhp5rh4iCtKwNqK1WIut547Og0Qx6WE0jJnT3NrNW7q00J9LkEjTq')
                stripe.redirectToCheckout({ sessionId });
                setLoading(false)
            }
        })
    }


  return (
    <div className='profileScreen'>
        <Nav subscription={subscription.role}/>
        <div className='profileScreen__body'>
            <div className='profileScreen__mainSection'>
                <h1>Subscription details</h1>
                <div className='profileScreen__info'>
                    <img src={avatar} alt='avatar' />
                    <div className='profileScreen__details'>
                        <h2>Email id: {activeUser.email}</h2>
                        <div className='profileScreen__plans'>
                            <p className='profileScreen__plansHeading'>Plans</p>
                            
                            <PlansScreen 
                            products={products}                        
                            subscription={subscription}
                            loadCheckout={loadCheckout}
                            />
                            <button 
                                className='profileScreen__signOut' 
                                onClick={ () => auth.signOut() }
                            >Sign Out</button>
                        </div>
                        <div>
                            {
                                loading && <Loader />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileScreen