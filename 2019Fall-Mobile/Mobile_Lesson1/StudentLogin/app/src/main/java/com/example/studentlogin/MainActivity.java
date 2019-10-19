package com.example.studentlogin;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;

import android.content.Intent;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;


public class MainActivity extends AppCompatActivity {
    Button login_button;
    EditText user_name;
    EditText user_password;
    int failed_count = 0;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        login_button = (Button)findViewById(R.id.login_button);
        user_name = (EditText)findViewById(R.id.user_name);
        user_password = (EditText)findViewById(R.id.user_password);

        login_button.setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                boolean validateFlag = false;
                String userName = user_name.getText().toString();
                String userPassword = user_password.getText().toString();

                if (!userName.isEmpty() && !userPassword.isEmpty()) {
                    if (userName.equals("Admin") && userPassword.equals("Admin")) {
                        validateFlag = true;
                    }
                }

                if (validateFlag){
                    failed_count = 0;
                    Intent redirect = new Intent( MainActivity.this, HomeActivity.class);
                    startActivity(redirect);

                } else{

                    failed_count++;

                }
            }
        });

    }
}
