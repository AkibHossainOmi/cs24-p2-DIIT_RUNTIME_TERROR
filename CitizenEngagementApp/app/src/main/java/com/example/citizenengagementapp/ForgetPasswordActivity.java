package com.example.citizenengagementapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;

public class ForgetPasswordActivity extends AppCompatActivity {

    private EditText editTextEmailAddress;
    private Button btnSubmit;
    private Button btnSignIn;
    private Button btnSignUp;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.forget_password_activity);

        // Initialize views
        editTextEmailAddress = findViewById(R.id.editTextEmailAddress);
        btnSubmit = findViewById(R.id.btnSubmit);
        btnSignIn = findViewById(R.id.btnSignIn);
        btnSignUp = findViewById(R.id.btnSignUp);

        // Set onClickListener for Submit button
        btnSubmit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Get the email address entered by the user
                String emailAddress = editTextEmailAddress.getText().toString().trim();

                // Validate email address (you can add your own validation logic here)

                // If email address is valid, proceed to the next page
                // For now, let's assume the email address is valid and move to the next page
                Intent intent = new Intent(ForgetPasswordActivity.this, EnterTokenActivity.class);
                startActivity(intent);
            }
        });

        // Set onClickListener for Sign In button
        btnSignIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Redirect to Sign In page
                Intent intent = new Intent(ForgetPasswordActivity.this, SignInActivity.class);
                startActivity(intent);
            }
        });

        // Set onClickListener for Sign Up button
        btnSignUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Redirect to Sign Up page
                Intent intent = new Intent(ForgetPasswordActivity.this, SignUpActivity.class);
                startActivity(intent);
            }
        });
    }
}
