import React from 'react';
import './PlansScreen.css';

function PlansScreen({products, subscription, loadCheckout}) {

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