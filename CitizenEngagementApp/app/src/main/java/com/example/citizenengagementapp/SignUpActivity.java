package com.example.citizenengagementapp;

import android.content.Intent;
import android.os.Bundle;
import android.util.Patterns;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class SignUpActivity extends AppCompatActivity {

    private EditText editTextUsername, editTextPassword, editTextEmail, editTextAddress, editTextWardNo;
    private Button btnSignIn, btnSignUp;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);

        // Initialize EditText fields and button
        editTextUsername = findViewById(R.id.editTextUsername);
        editTextPassword = findViewById(R.id.editTextPassword);
        editTextEmail = findViewById(R.id.editTextEmail);
        editTextAddress = findViewById(R.id.editTextAddress);
        editTextWardNo = findViewById(R.id.editTextWardNo);
        btnSignUp = findViewById(R.id.btnSignUp);
        btnSignIn = findViewById(R.id.btnSignIn);

        // Set onClickListener for Sign Up button
        btnSignUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Retrieve user input from EditText fields
                String username = editTextUsername.getText().toString().trim();
                String password = editTextPassword.getText().toString().trim();
                String email = editTextEmail.getText().toString().trim();
                String address = editTextAddress.getText().toString().trim();
                String wardNo = editTextWardNo.getText().toString().trim();

                // Validate input
                if (username.isEmpty() || password.isEmpty() || email.isEmpty() || address.isEmpty() || wardNo.isEmpty()) {
                    // Show error message if any field is empty
                    Toast.makeText(SignUpActivity.this, "Please fill all fields", Toast.LENGTH_SHORT).show();
                    return;
                }

                // Validate email format
                if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
                    editTextEmail.setError("Invalid email address");
                    editTextEmail.requestFocus();
                    return;
                }

                // Check if the user already exists in the database
                DatabaseHelperClass dbHelper = new DatabaseHelperClass(SignUpActivity.this);
                if (dbHelper.isUserExists(email)) {
                    // Show error message if user already exists
                    Toast.makeText(SignUpActivity.this, "User with this email already exists", Toast.LENGTH_SHORT).show();
                    return;
                }

                // Insert user data into the database
                long result = dbHelper.insertData(username, password, email, address, wardNo);

                // Check if insertion was successful
                if (result != -1) {
                    // Show success message
                    Toast.makeText(SignUpActivity.this, "Sign-up successful", Toast.LENGTH_SHORT).show();

                    // Navigate to the sign-in activity
                    Intent intent = new Intent(SignUpActivity.this, SignInActivity.class);
                    startActivity(intent);

                    // Finish the sign-up activity to prevent going back to it
                    finish();
                } else {
                    // Show error message if insertion failed
                    Toast.makeText(SignUpActivity.this, "Sign-up failed. Please try again.", Toast.LENGTH_SHORT).show();
                }
            }
        });

        // Set onClickListener for Sign In button
        btnSignIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Navigate to SignInActivity
                Intent intent = new Intent(SignUpActivity.this, SignInActivity.class);
                startActivity(intent);
            }
        });
    }
}
