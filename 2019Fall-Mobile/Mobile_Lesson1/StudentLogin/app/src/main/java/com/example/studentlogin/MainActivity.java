package com.example.studentlogin;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;

import android.content.Intent;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {
    Button login_button;
    EditText user_name;
    EditText user_password;

    String empty_value = "Your user name or password was empty please try again";
    String incorrect_values = "Your user name or password was incorrect";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        login_button = findViewById(R.id.login_button);
        user_name = findViewById(R.id.user_name);
        user_password = findViewById(R.id.user_password);

        login_button.setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String userName = user_name.getText().toString();
                String userPassword = user_password.getText().toString();

                if ( checkUserNameAndPass( userName, userPassword )) {
                    Intent redirect = new Intent(MainActivity.this, HomeActivity.class );
                    startActivity( redirect );
                }
            }
        });

    }

    private boolean checkUserNameAndPass(String userName, String userPassword) {
        Boolean validFlag = false;
        if (!userName.isEmpty() && !userPassword.isEmpty()) {
            if (userName.equals("Admin") && userPassword.equals("Admin")) {
                validFlag = true;
            } else {
                Toast.makeText(getApplicationContext(), incorrect_values, Toast.LENGTH_SHORT).show();
            }
        } else {
            Toast.makeText(getApplicationContext(), empty_value, Toast.LENGTH_SHORT).show();
        }

        return validFlag;

    }
}
