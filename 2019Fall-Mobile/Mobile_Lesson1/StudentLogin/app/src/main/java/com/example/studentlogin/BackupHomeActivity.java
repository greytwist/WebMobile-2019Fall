package com.example.studentlogin;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import android.content.Intent;

import androidx.appcompat.app.AppCompatActivity;


public class BackupHomeActivity extends AppCompatActivity {
    Button logout_button;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        logout_button = findViewById(R.id.logout_button);

        logout_button.setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent redirect = new Intent( BackupHomeActivity.this, MainActivity.class);
                startActivity(redirect);

            }
        });

    }


}
