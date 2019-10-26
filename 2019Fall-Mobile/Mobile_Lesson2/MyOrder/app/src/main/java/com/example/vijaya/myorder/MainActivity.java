package com.example.vijaya.myorder;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {
    private static final String MAIN_ACTIVITY_TAG = "MainActivity";
    final int PIZZA_BASE = 10;
    final int EXTRA_CHEESE = 1;
    final int PEPERONI = 2;
    final int ONION = 1;
    final int PEPPERS = 1;
    int quantity = 1;

    Button order_button;
    Button summary_button;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        order_button = findViewById(R.id.order_button);
        summary_button = findViewById(R.id.summary_button);

//        order_button.setOnClickListener( new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//
//
//
//            }
//        });
//
//        summary_button.setOnClickListener( new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                Intent redirect = new Intent(MainActivity.this, OrderSummary.class );
//                redirect.putExtra(String message, );
//                startActivity( redirect );
//            }
//        });
    }

    /**
     * This method is called when the order button is clicked.
     */

    public void submitOrder(View view) {

        // get user input
        EditText userInputNameView = (EditText) findViewById(R.id.user_input);
        String userInputName = userInputNameView.getText().toString();

        // check if cheese is selected
        CheckBox cheese = (CheckBox) findViewById(R.id.cheese_checked);
        boolean hasCheese = cheese.isChecked();

        // check if onion is selected
        CheckBox onion = (CheckBox) findViewById(R.id.onion_checked);
        boolean hasOnion = onion.isChecked();

        // check if pepper is selected
        CheckBox peppers = (CheckBox) findViewById(R.id.peppers_checked);
        boolean hasPeppers = peppers.isChecked();

        // check if pepper is selected
        CheckBox pepperoni = (CheckBox) findViewById(R.id.pepperoni_checked);
        boolean hasPepperoni = pepperoni.isChecked();

        // calculate and store the total price
        float totalPrice = calculatePrice(hasCheese, hasOnion, hasPepperoni, hasPeppers);

        // create and store the order summary
        String orderSummaryMessage = createOrderSummary(userInputName, hasCheese, hasOnion, hasPepperoni, hasPeppers, totalPrice);

        // Write the relevant code for making the buttons work(i.e implement the implicit and explicit intents
        sendEmail(userInputName, orderSummaryMessage );

    }

    public void sendEmail(String name, String output) {
        // Write the relevant code for triggering email

        // Hint to accomplish the task

        Intent intent = new Intent(Intent.ACTION_SEND);
        intent.putExtra(Intent.EXTRA_TEXT, output);
        intent.setType("text/plain");
        if (intent.resolveActivity(getPackageManager()) !=null){
            startActivity(intent);
        }
    }

    private String boolToString(boolean bool) {
        return bool ? (getString(R.string.yes)) : (getString(R.string.no));
    }

    private String createOrderSummary(String userInputName,
                                      boolean hasCheese,
                                      boolean hasOnion,
                                      boolean hasPepperoni,
                                      boolean hasPeppers,
                                      float price) {
        String orderSummaryMessage = getString(R.string.order_summary_name, userInputName) + "\n";
        float summary_prime  = price;
        if( hasCheese ){
            orderSummaryMessage = orderSummaryMessage.concat( "Plus Cheese \n" );
            price = price + this.EXTRA_CHEESE;
        }
        if( hasOnion ){
            orderSummaryMessage = orderSummaryMessage.concat( "Plus Onion \n" );
            price = price + this.ONION;
        }
        if( hasPepperoni ){
            orderSummaryMessage = orderSummaryMessage.concat( "Plus Peppers \n" );
            price = price + this.PEPPERS;
        }
        if( hasPeppers ){
            orderSummaryMessage = orderSummaryMessage.concat( "Plus  Pepperoni \n" );
            price = price + this.PEPERONI;
        }
        orderSummaryMessage = orderSummaryMessage.concat(getString(R.string.order_summary_quantity, quantity) + "\n");
        orderSummaryMessage = orderSummaryMessage.concat(getString(R.string.order_summary_total_price, summary_prime) + "\n");
        orderSummaryMessage.concat(getString(R.string.thank_you));
        return orderSummaryMessage;
    }

    /**
     * Method to calculate the total price
     *
     * @return total Price
     */
    private float calculatePrice(boolean hasCheese, boolean hasOnion, boolean hasPepperoni, boolean hasPeppers) {
        int basePrice = PIZZA_BASE;
        if (hasCheese) {
            basePrice += EXTRA_CHEESE;
        }
        if (hasOnion) {
            basePrice += ONION;
        }
        if (hasPepperoni) {
            basePrice += PEPERONI;
        }
        if (hasPeppers) {
            basePrice += PEPPERS;
        }
        return quantity * basePrice;
    }

    /**
     * This method displays the given quantity value on the screen.
     */
    private void display(int number) {
        TextView quantityTextView = (TextView) findViewById(R.id.quantity_text_view);
        quantityTextView.setText("" + number);
    }

    /**
     * This method increments the quantity of coffee cups by one
     *
     * @param view on passes the view that we are working with to the method
     */

    public void increment(View view) {
        if (quantity < 50) {
            quantity = quantity + 1;
            display(quantity);
        } else {
            Log.i("MainActivity", "Please select less than one hundred cups of coffee");
            Context context = getApplicationContext();
            String lowerLimitToast = getString(R.string.too_many_pizza);
            int duration = Toast.LENGTH_SHORT;
            Toast toast = Toast.makeText(context, lowerLimitToast, duration);
            toast.show();
            return;
        }
    }

    /**
     * This method decrements the quantity of coffee cups by one
     *
     * @param view passes on the view that we are working with to the method
     */
    public void decrement(View view) {
        if (quantity > 1) {
            quantity = quantity - 1;
            display(quantity);
        } else {
            Log.i("MainActivity", "Please select atleast one cup of coffee");
            Context context = getApplicationContext();
            String upperLimitToast = getString(R.string.too_few_pizza);
            int duration = Toast.LENGTH_SHORT;
            Toast toast = Toast.makeText(context, upperLimitToast, duration);
            toast.show();
            return;
        }
    }
}