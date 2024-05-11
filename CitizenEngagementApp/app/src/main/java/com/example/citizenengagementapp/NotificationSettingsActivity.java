package com.example.citizenengagementapp;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.ImageButton;
import android.widget.PopupMenu;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class NotificationSettingsActivity extends AppCompatActivity {

    private CheckBox checkBoxGarbageCollection;
    private CheckBox checkBoxWasteManagementEvents;
    private CheckBox checkBoxRecyclingGuidelines;
    private CheckBox checkBoxEducationalMaterials;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.notification_settings_activity);

        // Initialize the three-dot button
        ImageButton btnThreeDot = findViewById(R.id.btnThreeDot);
        btnThreeDot.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Create and show the PopupMenu
                showPopupMenu(btnThreeDot);
            }
        });

        // Initialize checkboxes
        checkBoxGarbageCollection = findViewById(R.id.checkBoxGarbageCollection);
        checkBoxWasteManagementEvents = findViewById(R.id.checkBoxWasteManagementEvents);
        checkBoxRecyclingGuidelines = findViewById(R.id.checkBoxRecyclingGuidelines);
        checkBoxEducationalMaterials = findViewById(R.id.checkBoxEducationalMaterials);

        // Load saved settings
        loadNotificationSettings();

        // Save button click listener
        Button btnSave = findViewById(R.id.btnSave);
        btnSave.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                saveNotificationSettings();
                Intent intent = new Intent(NotificationSettingsActivity.this, NotificationActivity.class);
                startActivity(intent);
            }
        });
    }

    private void loadNotificationSettings() {
        // Load saved settings from SharedPreferences
        SharedPreferences preferences = getSharedPreferences("NotificationSettings", MODE_PRIVATE);
        checkBoxGarbageCollection.setChecked(preferences.getBoolean("GarbageCollection", true));
        checkBoxWasteManagementEvents.setChecked(preferences.getBoolean("WasteManagementEvents", true));
        checkBoxRecyclingGuidelines.setChecked(preferences.getBoolean("RecyclingGuidelines", true));
        checkBoxEducationalMaterials.setChecked(preferences.getBoolean("EducationalMaterials", true));
    }

    private void saveNotificationSettings() {
        // Save current settings to SharedPreferences
        SharedPreferences.Editor editor = getSharedPreferences("NotificationSettings", MODE_PRIVATE).edit();
        editor.putBoolean("GarbageCollection", checkBoxGarbageCollection.isChecked());
        editor.putBoolean("WasteManagementEvents", checkBoxWasteManagementEvents.isChecked());
        editor.putBoolean("RecyclingGuidelines", checkBoxRecyclingGuidelines.isChecked());
        editor.putBoolean("EducationalMaterials", checkBoxEducationalMaterials.isChecked());
        editor.apply();

        // Show a toast message indicating settings saved
        Toast.makeText(this, "Notification settings saved", Toast.LENGTH_SHORT).show();

        // Finish the activity
        finish();
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
                    Intent intent = new Intent(NotificationSettingsActivity.this, ReportIssueActivity.class);
                    startActivity(intent);
                    return true;
                }
                if (item.getItemId() == R.id.menu_user_profile) {
                    Intent intent = new Intent(NotificationSettingsActivity.this, UserProfileActivity.class);
                    startActivity(intent);
                    return true;
                }
                if (item.getItemId() == R.id.menu_notification) {
                    Intent intent = new Intent(NotificationSettingsActivity.this, NotificationActivity.class);
                    startActivity(intent);
                    return true;
                }
                if (item.getItemId() == R.id.menu_comunity_engagement) {
                    Intent intent = new Intent(NotificationSettingsActivity.this, ForumActivity.class);
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
        Intent intent = new Intent(NotificationSettingsActivity.this, SignInActivity.class);
        // Clear the activity stack to prevent the user from navigating back to the profile page
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        // Finish the current activity
        finish();
    }
}
