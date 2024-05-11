package com.example.citizenengagementapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private boolean backButtonPressedOnce = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Initialize buttons
        Button btnSignIn = findViewById(R.id.btnSignIn);
        Button btnSignUp = findViewById(R.id.btnSignUp);

        // Set onClickListener for sign in button
        btnSignIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Start SignInActivity
                Intent intent = new Intent(MainActivity.this, SignInActivity.class);
                startActivity(intent);
            }
        });

        // Set onClickListener for sign up button
        btnSignUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Start SignUpActivity
                Intent intent = new Intent(MainActivity.this, SignUpActivity.class);
                startActivity(intent);
            }
        });
    }

    @Override
    public void onBackPressed() {
        if (backButtonPressedOnce) {
            super.onBackPressed();
            return;
        }

        this.backButtonPressedOnce = true;
        Toast.makeText(this, "Press again to close the app", Toast.LENGTH_SHORT).show();

        new android.os.Handler().postDelayed(
                new Runnable() {
                    @Override
                    public void run() {
                        backButtonPressedOnce = false;
                    }
                },
                2000 // Delay for 2 seconds
        );
    }
}
