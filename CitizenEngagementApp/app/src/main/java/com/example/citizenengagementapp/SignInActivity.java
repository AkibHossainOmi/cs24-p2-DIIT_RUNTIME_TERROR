package com.example.citizenengagementapp;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;

public class SignInActivity extends AppCompatActivity {

    private EditText editTextEmail, editTextPassword;
    private Button btnSignIn, btnForgotPassword, btnSignUp;

    // SharedPreferences
    private SharedPreferences sharedPreferences;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signin);

        // Initialize EditText fields and buttons
        editTextEmail = findViewById(R.id.editTextEmail);
        editTextPassword = findViewById(R.id.editTextPassword);
        btnSignIn = findViewById(R.id.btnSignIn);
        btnForgotPassword = findViewById(R.id.btnForgotPassword);
        btnSignUp = findViewById(R.id.btnSignUp);

        // SharedPreferences initialization
        sharedPreferences = getSharedPreferences("user_prefs", Context.MODE_PRIVATE);

        // Set onClickListener for Sign In button
        btnSignIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Retrieve user input from EditText fields
                String email = editTextEmail.getText().toString().trim();
                String password = editTextPassword.getText().toString().trim();

                // Validate input (you can add your validation logic here)

                // Example: Check if email is empty
                if (email.isEmpty()) {
                    editTextEmail.setError("E-mail is required");
                    editTextEmail.requestFocus();
                    return;
                }

                // Example: Check if password is empty
                if (password.isEmpty()) {
                    editTextPassword.setError("Password is required");
                    editTextPassword.requestFocus();
                    return;
                }

                // If all validations pass, you can proceed with sign in process
                // Here you can add your code to authenticate the user or perform any other desired actions
                // For simplicity, let's assume the authentication is successful
                // Save the signed-in email in SharedPreferences
                saveSignedInEmail(email);

                // Navigate to the dashboard
                Intent intent = new Intent(SignInActivity.this, DashboardActivity.class);
                startActivity(intent);
                finish(); // Close the sign-in activity
            }
        });

        // Set onClickListener for Forgot Password button
        btnForgotPassword.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Redirect to ForgetPasswordActivity
                Intent intent = new Intent(SignInActivity.this, ForgetPasswordActivity.class);
                startActivity(intent);
            }
        });

        // Set onClickListener for Sign Up button
        btnSignUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Navigate to SignUpActivity
                Intent intent = new Intent(SignInActivity.this, SignUpActivity.class);
                startActivity(intent);
            }
        });
    }

    // Method to save signed-in email in SharedPreferences
    private void saveSignedInEmail(String email) {
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString("signed_in_email", email);
        editor.apply();
    }
}
