package com.example.citizenengagementapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;

public class EnterTokenActivity extends AppCompatActivity {

    private EditText editTextToken, editTextNewPassword, editTextConfirmPassword;
    private Button btnSubmit;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_enter_token);

        // Initialize EditText fields and Button
        editTextToken = findViewById(R.id.editTextToken);
        editTextNewPassword = findViewById(R.id.editTextNewPassword);
        editTextConfirmPassword = findViewById(R.id.editTextConfirmPassword);
        btnSubmit = findViewById(R.id.btnSubmit);

        // Set OnClickListener for the Submit button
        btnSubmit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Handle the submission of token and new password
                String token = editTextToken.getText().toString().trim();
                String newPassword = editTextNewPassword.getText().toString().trim();
                String confirmPassword = editTextConfirmPassword.getText().toString().trim();

                // Perform your validation and submission logic here
                // For now, let's just display the entered values
                String message = "Token: " + token + "\nNew Password: " + newPassword + "\nConfirm Password: " + confirmPassword;
                // You can replace this with your actual logic
                // For example, you might validate the token and ensure the new password matches the confirm password
                // If validation passes, you might proceed with updating the password in the database
                // Otherwise, you might display an error message to the user
                // For demonstration purposes, we'll just display the entered values in a toast message
                // Toast.makeText(EnterTokenActivity.this, message, Toast.LENGTH_SHORT).show();

                // Set OnClickListener for the Submit button
                btnSubmit.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        // Handle the submission of token and new password
                        String token = editTextToken.getText().toString().trim();
                        String newPassword = editTextNewPassword.getText().toString().trim();
                        String confirmPassword = editTextConfirmPassword.getText().toString().trim();

                        // Perform your validation and submission logic here
                        // For now, let's just display the entered values
                        String message = "Token: " + token + "\nNew Password: " + newPassword + "\nConfirm Password: " + confirmPassword;
                        // You can replace this with your actual logic
                        // For example, you might validate the token and ensure the new password matches the confirm password
                        // If validation passes, you might proceed with updating the password in the database
                        // Otherwise, you might display an error message to the user
                        // For demonstration purposes, we'll just display the entered values in a toast message
                        // Toast.makeText(EnterTokenActivity.this, message, Toast.LENGTH_SHORT).show();

                        // Redirect back to the sign-in activity
                        Intent intent = new Intent(EnterTokenActivity.this, SignInActivity.class);
                        startActivity(intent);
                        finish(); // Close the EnterTokenActivity
                    }
                });

            }
        });
    }
}
