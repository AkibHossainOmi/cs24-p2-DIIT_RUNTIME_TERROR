package com.example.citizenengagementapp;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.PopupMenu;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class ResetPasswordActivity extends AppCompatActivity {

    private EditText editTextCurrentPassword, editTextNewPassword, editTextConfirmNewPassword;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.reset_password_activity);

        // Initialize EditTexts
        editTextCurrentPassword = findViewById(R.id.editTextCurrentPassword);
        editTextNewPassword = findViewById(R.id.editTextNewPassword);
        editTextConfirmNewPassword = findViewById(R.id.editTextConfirmNewPassword);

        // Set onClickListener for Reset Password button
        Button buttonResetPassword = findViewById(R.id.buttonResetPassword);
        buttonResetPassword.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Reset password logic
                resetPassword();
            }
        });

        // Set up onClickListener for the Three-dot Button
        @SuppressLint("WrongViewCast") Button btnThreeDot = findViewById(R.id.btnThreeDot);
        btnThreeDot.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Create and show the PopupMenu
                showPopupMenu(btnThreeDot);
            }
        });
    }

    // Method to show the PopupMenu
    private void showPopupMenu(View view) {
        PopupMenu popupMenu = new PopupMenu(this, view);
        popupMenu.getMenuInflater().inflate(R.menu.popup_menu, popupMenu.getMenu());
        popupMenu.setOnMenuItemClickListener(new PopupMenu.OnMenuItemClickListener() {
            @Override
            public boolean onMenuItemClick(MenuItem item) {
                if (item.getItemId() == R.id.menu_logout) {
                    logoutUser();
                    return true;
                }
                if (item.getItemId() == R.id.menu_issue_reporting) {
                    Intent intent = new Intent(ResetPasswordActivity.this, ReportIssueActivity.class);
                    startActivity(intent);
                    return true;
                }
                if (item.getItemId() == R.id.menu_user_profile) {
                    Intent intent = new Intent(ResetPasswordActivity.this, UserProfileActivity.class);
                    startActivity(intent);
                    return true;
                }
                if (item.getItemId() == R.id.menu_notification) {
                    Intent intent = new Intent(ResetPasswordActivity.this, NotificationActivity.class);
                    startActivity(intent);
                    return true;
                }
                if (item.getItemId() == R.id.menu_comunity_engagement) {
                    Intent intent = new Intent(ResetPasswordActivity.this, ForumActivity.class);
                    startActivity(intent);
                    return true;
                }
                return false;
            }
        });
        popupMenu.show();
    }

    // Method to log out the user
    private void logoutUser() {
        // Perform any necessary tasks for logging out the user
        // For example, clear session data, reset user preferences, etc.

        // Navigate to SignInActivity
        Intent intent = new Intent(ResetPasswordActivity.this, SignInActivity.class);
        // Clear the activity stack to prevent the user from navigating back to the profile page
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        // Finish the current activity
        finish();
    }

    // Method to redirect to UserProfileActivity
    private void redirectToUserProfile() {
        Intent intent = new Intent(ResetPasswordActivity.this, UserProfileActivity.class);
        startActivity(intent);
    }

    // Method to redirect to ReportIssueActivity
    private void redirectToReportIssue() {
        Intent intent = new Intent(ResetPasswordActivity.this, ReportIssueActivity.class);
        startActivity(intent);
    }

    // Method to reset password
    private void resetPassword() {
        // Retrieve the values entered by the user
        String currentPassword = editTextCurrentPassword.getText().toString().trim();
        String newPassword = editTextNewPassword.getText().toString().trim();
        String confirmNewPassword = editTextConfirmNewPassword.getText().toString().trim();

        // Perform validation
        if (currentPassword.isEmpty() || newPassword.isEmpty() || confirmNewPassword.isEmpty()) {
            // If any field is empty, show a toast message
            Toast.makeText(this, "Please fill all fields", Toast.LENGTH_SHORT).show();
        } else if (newPassword.equals(currentPassword)) {
            // If new password is same as current password, show a toast message
            Toast.makeText(this, "Current password can't be your new password", Toast.LENGTH_SHORT).show();
        } else if (!newPassword.equals(confirmNewPassword)) {
            // If new password and confirm new password do not match, show a toast message
            Toast.makeText(this, "New password and confirm new password do not match", Toast.LENGTH_SHORT).show();
        } else {
            // Replace this with your logic to reset password
            // For demonstration purposes, let's just display a toast message
            Toast.makeText(this, "Password reset successfully", Toast.LENGTH_SHORT).show();
            // Finish the activity after resetting password
            finish();
        }
    }
}
