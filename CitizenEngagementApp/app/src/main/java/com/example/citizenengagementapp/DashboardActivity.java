package com.example.citizenengagementapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageButton;
import android.widget.PopupMenu;

import androidx.appcompat.app.AppCompatActivity;

public class DashboardActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);

        // Initialize the three-dot button
        ImageButton btnThreeDot = findViewById(R.id.btnThreeDot);
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
                    Intent intent = new Intent(DashboardActivity.this, ReportIssueActivity.class);
                    startActivity(intent);
                    return true;
                }
                if (item.getItemId() == R.id.menu_user_profile) {
                    Intent intent = new Intent(DashboardActivity.this, UserProfileActivity.class);
                    startActivity(intent);
                    return true;
                }
                if(item.getItemId() == R.id.menu_notification){
                    Intent intent = new Intent(DashboardActivity.this, NotificationActivity.class);
                    startActivity(intent);
                    return true;
                }
                if (item.getItemId() == R.id.menu_comunity_engagement) {
                    Intent intent = new Intent(DashboardActivity.this, ForumActivity.class);
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
        Intent intent = new Intent(DashboardActivity.this, SignInActivity.class);
        // Clear the activity stack to prevent the user from navigating back to the dashboard
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        // Finish the current activity
        finish();
    }
}
