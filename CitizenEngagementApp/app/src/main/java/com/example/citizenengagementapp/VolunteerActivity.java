package com.example.citizenengagementapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.CalendarView;
import android.widget.ImageButton;
import android.widget.ListView;
import android.widget.PopupMenu;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import java.util.ArrayList;
import java.util.List;

public class VolunteerActivity extends AppCompatActivity {

    private CalendarView calendarView;
    private ListView eventListView;
    private ArrayAdapter<String> adapter;
    private List<String> eventList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.volunteer_feature_layout);

        // Initialize views
        calendarView = findViewById(R.id.calendarView);
        eventListView = findViewById(R.id.eventListView);

        // Initialize the three-dot button
        ImageButton btnThreeDot = findViewById(R.id.btnThreeDot);
        btnThreeDot.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Create and show the PopupMenu
                showPopupMenu(btnThreeDot);
            }
        });

        // Initialize event list
        eventList = new ArrayList<>();

        // Initialize adapter
        adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, eventList);
        eventListView.setAdapter(adapter);

        // Set listener for calendar item click
        calendarView.setOnDateChangeListener(new CalendarView.OnDateChangeListener() {
            @Override
            public void onSelectedDayChange(CalendarView view, int year, int month, int dayOfMonth) {
                // Handle calendar date selection
                handleCalendarSelection(year, month, dayOfMonth);
            }
        });

        // Set listener for event list item click
        eventListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                // Handle event list item click
                handleEventSelection(position);
            }
        });
    }

    private void handleCalendarSelection(int year, int month, int dayOfMonth) {
        // Clear previous events
        eventList.clear();

        // Perform operation to fetch events for the selected date
        // For demonstration, let's add some sample events
        eventList.add("Event 1");
        eventList.add("Event 2");
        eventList.add("Event 3");

        // Notify adapter about data change
        adapter.notifyDataSetChanged();
    }

    private void handleEventSelection(int position) {
        // Handle event selection
        String selectedEvent = eventList.get(position);

        // Perform operation to redirect to event registration page
        // For demonstration, let's display a toast message with the selected event
        Toast.makeText(this, "Selected Event: " + selectedEvent, Toast.LENGTH_SHORT).show();
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
                    Intent intent = new Intent(VolunteerActivity.this, UserProfileActivity.class);
                    startActivity(intent);
                    return true;
                }
                if (item.getItemId() == R.id.menu_notification) {
                    Intent intent = new Intent(VolunteerActivity.this, NotificationActivity.class);
                    startActivity(intent);
                    return true;
                }
                if (item.getItemId() == R.id.menu_comunity_engagement) {
                    Intent intent = new Intent(VolunteerActivity.this, ForumActivity.class);
                    startActivity(intent);
                    return true;
                }
                if (item.getItemId() == R.id.menu_reported_issues) {
                    Intent intent = new Intent(VolunteerActivity.this, ReportedIssuesActivity.class);
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
        Intent intent = new Intent(VolunteerActivity.this, SignInActivity.class);
        // Clear the activity stack to prevent the user from navigating back to the reported issues page
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        // Finish the current activity
        finish();
    }
}
