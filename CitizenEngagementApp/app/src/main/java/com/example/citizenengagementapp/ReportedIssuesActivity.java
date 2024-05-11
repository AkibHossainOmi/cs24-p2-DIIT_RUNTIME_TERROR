package com.example.citizenengagementapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ImageButton;
import android.widget.ListView;
import android.widget.PopupMenu;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import java.util.ArrayList;
import java.util.List;

public class ReportedIssuesActivity extends AppCompatActivity {

    private ImageButton btnThreeDot;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_reported_issues);

        // Initialize views
        btnThreeDot = findViewById(R.id.btnThreeDot);
        ListView listViewReportedIssues = findViewById(R.id.listViewReportedIssues);

        // Get reported issues from the database or any other data source
        List<String> reportedIssuesList = getReportedIssuesFromDataSource();

        // Create adapter for the ListView
        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, reportedIssuesList);

        // Set the adapter to the ListView
        listViewReportedIssues.setAdapter(adapter);

        // Set onItemClick listener for the ListView items
        listViewReportedIssues.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                // Handle item click (you can implement further actions here)
                String selectedIssue = reportedIssuesList.get(position);
                Toast.makeText(ReportedIssuesActivity.this, "Selected Issue: " + selectedIssue, Toast.LENGTH_SHORT).show();
            }
        });

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

    // Method to get reported issues from the data source (Replace with your actual implementation)
    private List<String> getReportedIssuesFromDataSource() {
        // Mock data for reported issues (replace with actual data from the database)
        List<String> reportedIssuesList = new ArrayList<>();
        reportedIssuesList.add("Overflowing bins");
        reportedIssuesList.add("Littering");
        reportedIssuesList.add("Illegal dumping");
        reportedIssuesList.add("Damaged infrastructure");
        return reportedIssuesList;
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
                if (item.getItemId() == R.id.menu_user_profile) {
                    Intent intent = new Intent(ReportedIssuesActivity.this, UserProfileActivity.class);
                    startActivity(intent);
                    return true;
                }
                if (item.getItemId() == R.id.menu_notification) {
                    Intent intent = new Intent(ReportedIssuesActivity.this, NotificationActivity.class);
                    startActivity(intent);
                    return true;
                }
                if (item.getItemId() == R.id.menu_comunity_engagement) {
                    Intent intent = new Intent(ReportedIssuesActivity.this, ForumActivity.class);
                    startActivity(intent);
                    return true;
                }
                if (item.getItemId() == R.id.menu_events) {
                    Intent intent = new Intent(ReportedIssuesActivity.this, VolunteerActivity.class);
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
        Intent intent = new Intent(ReportedIssuesActivity.this, SignInActivity.class);
        // Clear the activity stack to prevent the user from navigating back to the reported issues page
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        // Finish the current activity
        finish();
    }
}
