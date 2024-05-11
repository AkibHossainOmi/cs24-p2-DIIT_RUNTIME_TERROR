package com.example.citizenengagementapp;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class SignInActivity extends AppCompatActivity {

    private EditText editTextUsernameEmail, editTextPassword;
    private Button btnSignIn, btnForgotPassword, btnSignUp;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signin);

        // Initialize EditText fields and buttons
        editTextUsernameEmail = findViewById(R.id.editTextUsernameEmail);
        editTextPassword = findViewById(R.id.editTextPassword);
        btnSignIn = findViewById(R.id.btnSignIn);
        btnForgotPassword = findViewById(R.id.btnForgotPassword);
        btnSignUp = findViewById(R.id.btnSignUp);

        // Set onClickListener for Sign In button
        btnSignIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Retrieve user input from EditText fields
                final String usernameEmail = editTextUsernameEmail.getText().toString().trim();
                final String password = editTextPassword.getText().toString().trim();

                // Validate input (you can add your validation logic here)

                // Example: Check if username/email is empty
                if (usernameEmail.isEmpty()) {
                    editTextUsernameEmail.setError("Username/E-mail is required");
                    editTextUsernameEmail.requestFocus();
                    return;
                }

                // Example: Check if password is empty
                if (password.isEmpty()) {
                    editTextPassword.setError("Password is required");
                    editTextPassword.requestFocus();
                    return;
                }

                // Authenticate user against the database
                DatabaseHelperClass dbHelper = new DatabaseHelperClass(SignInActivity.this);
                User user = dbHelper.getUser(usernameEmail, password);

                // Check if user exists and credentials are valid
                if (user != null) {
                    // Save user's email as a token in local storage
                    // Here, you can use SharedPreferences or any other local storage mechanism
                    // For simplicity, let's assume you're using SharedPreferences
                    SharedPreferences sharedPreferences = getSharedPreferences("UserPrefs", Context.MODE_PRIVATE);
                    SharedPreferences.Editor editor = sharedPreferences.edit();
                    editor.putString("userEmail", user.getEmail());
                    editor.apply();

                    // Proceed to the dashboard
                    Intent intent = new Intent(SignInActivity.this, DashboardActivity.class);
                    startActivity(intent);
                    finish(); // Close the sign-in activity
                } else {
                    // User authentication failed
                    // You can show an error message to the user
                    Toast.makeText(SignInActivity.this, "Invalid username/email or password", Toast.LENGTH_SHORT).show();
                }
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

    @Override
    public void onBackPressed() {
        // Route back to the main activity (MainActivity)
        super.onBackPressed();
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
        finish(); // Close the sign-in activity
    }
}
