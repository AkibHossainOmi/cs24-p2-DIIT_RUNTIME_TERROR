package com.example.citizenengagementapp;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.PopupMenu;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

public class ReportIssueActivity extends AppCompatActivity {

    private EditText editTextLocation;
    private Spinner spinnerIssueType;
    private EditText editTextDescription;
    private Button btnAttachPhoto;
    private CheckBox checkboxAnonymous;
    private Button btnSubmit;
    private ImageView imageViewPreview; // Add ImageView for previewing the selected image

    private static final int REQUEST_IMAGE_CAPTURE = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_report_issue);

        // Initialize views
        editTextLocation = findViewById(R.id.editTextLocation);
        spinnerIssueType = findViewById(R.id.spinnerIssueType);
        editTextDescription = findViewById(R.id.editTextDescription);
        btnAttachPhoto = findViewById(R.id.btnAttachPhoto);
        checkboxAnonymous = findViewById(R.id.checkboxAnonymous);
        btnSubmit = findViewById(R.id.btnSubmit);
        imageViewPreview = findViewById(R.id.imageViewPreview); // Initialize ImageView

        // Set up spinner for issue types
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this,
                R.array.issue_types, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerIssueType.setAdapter(adapter);

        // Set up onClickListener for the Attach Photo button
        btnAttachPhoto.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                dispatchTakePictureIntent();
            }
        });

        // Set up onClickListener for the Submit button
        btnSubmit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Get user inputs
                String location = editTextLocation.getText().toString().trim();
                String issueType = spinnerIssueType.getSelectedItem().toString();
                String description = editTextDescription.getText().toString().trim();
                boolean isAnonymous = checkboxAnonymous.isChecked();

                // Validate inputs (you can add your own validation logic here)

                // Example: Check if location is empty
                if (location.isEmpty()) {
                    editTextLocation.setError("Location is required");
                    editTextLocation.requestFocus();
                    return;
                }

                // Example: Check if description is empty
                if (description.isEmpty()) {
                    editTextDescription.setError("Description is required");
                    editTextDescription.requestFocus();
                    return;
                }

                // Process the report submission (you can add your own logic here)
                // For demonstration, let's just display a toast message
                String message = "Location: " + location + "\nIssue Type: " + issueType + "\nDescription: " + description + "\nAnonymous: " + isAnonymous;
                Toast.makeText(ReportIssueActivity.this, message, Toast.LENGTH_LONG).show();

                // After submitting the report, redirect to the ReportedIssuesActivity
                redirectToReportedIssuesActivity();
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
                    Intent intent = new Intent(ReportIssueActivity.this, UserProfileActivity.class);
                    startActivity(intent);
                    return true;
                }
                if (item.getItemId() == R.id.menu_notification) {
                    Intent intent = new Intent(ReportIssueActivity.this, NotificationActivity.class);
                    startActivity(intent);
                    return true;
                }
                if (item.getItemId() == R.id.menu_comunity_engagement) {
                    Intent intent = new Intent(ReportIssueActivity.this, ForumActivity.class);
                    startActivity(intent);
                    return true;
                }
                if (item.getItemId() == R.id.menu_events) {
                    Intent intent = new Intent(ReportIssueActivity.this, VolunteerActivity.class);
                    startActivity(intent);
                    return true;
                }
                if (item.getItemId() == R.id.menu_reported_issues) {
                    Intent intent = new Intent(ReportIssueActivity.this, ReportedIssuesActivity.class);
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
        Intent intent = new Intent(ReportIssueActivity.this, SignInActivity.class);
        // Clear the activity stack to prevent the user from navigating back to the profile page
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        // Finish the current activity
        finish();
    }

    // Method to redirect to ReportedIssuesActivity
    private void redirectToReportedIssuesActivity() {
        Intent intent = new Intent(ReportIssueActivity.this, ReportedIssuesActivity.class);
        startActivity(intent);
    }

    // Method to launch the gallery picker
    private void dispatchTakePictureIntent() {
        Intent galleryIntent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        if (galleryIntent.resolveActivity(getPackageManager()) != null) {
            startActivityForResult(galleryIntent, REQUEST_IMAGE_CAPTURE);
        } else {
            Toast.makeText(this, "Gallery not available", Toast.LENGTH_SHORT).show();
        }
    }

    // Handle the result of the gallery picker
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK && data != null) {
            // Handle the selected image
            Uri selectedImageUri = data.getData();
            if (selectedImageUri != null) {
                // Set the selected image URI to the ImageView for preview
                imageViewPreview.setImageURI(selectedImageUri);
                imageViewPreview.setVisibility(View.VISIBLE); // Make the preview visible
            }
        }
    }
}
