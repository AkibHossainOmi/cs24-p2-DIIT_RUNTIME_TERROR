package com.example.citizenengagementapp;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.PopupMenu;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class UserProfileActivity extends AppCompatActivity {

    private TextView textViewUsername, textViewEmail, textViewAddress, textViewWardNo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.profile_activity);

        // Initialize TextViews
        textViewUsername = findViewById(R.id.textViewUsername);
        textViewEmail = findViewById(R.id.textViewEmail);
        textViewAddress = findViewById(R.id.textViewAddress);
        textViewWardNo = findViewById(R.id.textViewWardNo);

        // Fetch user data from the database based on the signed-in email address
        String signedInEmail = getSignedInEmail(); // Method to retrieve signed-in email from SharedPreferences
        DatabaseHelperClass dbHelper = new DatabaseHelperClass(this);
        User user = dbHelper.getUserByEmail(signedInEmail);

        // Debug logs to check user data retrieval
        if (user != null) {
            Log.d("UserProfileActivity", "User found: " + user.getUsername());
        } else {
            Log.d("UserProfileActivity", "No user found for email: " + signedInEmail);
        }

        // Display user data in TextViews
        if (user != null) {
            textViewUsername.setText("Username: " + user.getUsername());
            textViewEmail.setText("Email: " + user.getEmail());
            textViewAddress.setText("Address: " + user.getAddress());
            textViewWardNo.setText("Ward No: " + user.getWardNo());
        } else {
            // Handle case when user is null (no data found)
            textViewUsername.setText("No user data found");
            textViewEmail.setText("");
            textViewAddress.setText("");
            textViewWardNo.setText("");
        }


        // Initialize the three-dot button
        ImageButton btnThreeDot = findViewById(R.id.btnThreeDot);
        btnThreeDot.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Create and show the PopupMenu
                showPopupMenu(btnThreeDot);
            }
        });

        // Initialize the "Edit Profile" button
        Button btnEditProfile = findViewById(R.id.btnEditProfile);
        btnEditProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Navigate to EditProfileActivity
                Intent intent = new Intent(UserProfileActivity.this, EditProfileActivity.class);
                startActivity(intent);
            }
        });

        // Initialize the "Reset Password" button
        Button btnResetPassword = findViewById(R.id.btnResetPassword);
        btnResetPassword.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Navigate to ResetPasswordActivity
                Intent intent = new Intent(UserProfileActivity.this, ResetPasswordActivity.class);
                startActivity(intent);
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
                    redirectToReportIssueActivity();
                    return true;
                }
                if (item.getItemId() == R.id.menu_notification) {
                    redirectToNotificationActivity();
                    return true;
                }
                if (item.getItemId() == R.id.menu_comunity_engagement) {
                    Intent intent = new Intent(UserProfileActivity.this, ForumActivity.class);
                    startActivity(intent);
                    return true;
                }
                if (item.getItemId() == R.id.menu_events) {
                    Intent intent = new Intent(UserProfileActivity.this, VolunteerActivity.class);
                    startActivity(intent);
                    return true;
                }
                if (item.getItemId() == R.id.menu_reported_issues) {
                    Intent intent = new Intent(UserProfileActivity.this, ReportedIssuesActivity.class);
                    startActivity(intent);
                    return true;
                }

                return false;
            }
        });
        popupMenu.show();
    }

    // Method to redirect to ReportIssueActivity
    private void redirectToReportIssueActivity() {
        Intent intent = new Intent(UserProfileActivity.this, ReportIssueActivity.class);
        startActivity(intent);
    }

    // Method to redirect to NotificationSettingsActivity
    private void redirectToNotificationActivity() {
        Intent intent = new Intent(UserProfileActivity.this, NotificationActivity.class);
        startActivity(intent);
    }

    // Method to log out the user
    private void logoutUser() {
        // Perform any necessary tasks for logging out the user
        // For example, clear session data, reset user preferences, etc.

        // Navigate to SignInActivity
        Intent intent = new Intent(UserProfileActivity.this, SignInActivity.class);
        // Clear the activity stack to prevent the user from navigating back to the profile page
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        // Finish the current activity
        finish();
    }

    // Method to retrieve signed-in email from SharedPreferences
    private String getSignedInEmail() {
        SharedPreferences sharedPreferences = getSharedPreferences("user_prefs", MODE_PRIVATE);
        return sharedPreferences.getString("signed_in_email", "");
    }
}
