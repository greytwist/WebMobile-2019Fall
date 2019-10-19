package com.example.studentlogin;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class HomeActivity extends AppCompatActivity {

    Button logout_button;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        logout_button = findViewById(R.id.logout_button);

        logout_button.setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent redirect = new Intent( HomeActivity.this, MainActivity.class);
                startActivity(redirect);

            }
        });
    }
}
