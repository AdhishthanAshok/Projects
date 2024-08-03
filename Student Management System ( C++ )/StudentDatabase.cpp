#include <bits/stdc++.h> // Header Files
#include <iostream>
#include <string>
#include <fstream>
#include <cstdio>

using namespace std;

class student // Student class Declaration
{
private:
    string standard, roll_no, Phone_number, name, section, adress, email;

public:
    void menu();
    void insert();
    void display();
    void modify();
    void search();
    void Deleted();
};

void student ::menu() // Menu of the Program
{
    system("cls");
    int choice;
    char x;
    cout << "\t\t\t\t ------------------------------------------------------------------" << endl;
    cout << "\t\t\t\t|------------------STUDENT MANAGEMENT SYSTEM-----------------------|" << endl;
    cout << "\t\t\t\t ------------------------------------------------------------------" << endl
         << endl;

    cout << "\n\n\t\t\t\t [ NOTE ] --> Do not put any spacing while filling in the data" << endl
         << endl;

    cout << "\t\t\t\t1 . Enter New Student's Record  " << endl;
    cout << "\t\t\t\t2 . Display Student's Record  " << endl;
    cout << "\t\t\t\t3 . Modify Student's Record  " << endl;
    cout << "\t\t\t\t4 . Search Student's Record  " << endl;
    cout << "\t\t\t\t5 . Delete Student's Record  " << endl;
    cout << "\t\t\t\t6 . EXIT " << endl
         << endl;

    cout << "\t\t\t\t-----------------------------------------------" << endl;
    cout << "\t\t\t\tEnter your choice of operation : " << endl;
    cout << "\t\t\t\t";
    cin >> choice;

    switch (choice)
    {
    case 1:
    {
        do
        {
            insert();
            cout << "\t\t\t\t\n Want to add another Student's Record ? Press (Y , y) for Yes and (N , n) for NO " << endl;
            cin >> x;
        } while (x == 'Y' || x == 'y');
        system("cls");
        student ::menu();
        break;
    }
    case 2:
    {
        display();
        system("PAUSE");
        system("cls");
        student ::menu();
        break;
    }
    case 3:
    {
        modify();
        system("PAUSE");
        system("cls");
        student ::menu();
        break;
    }
    case 4:
    {
        search();
        system("PAUSE");
        system("cls");
        student ::menu();
        break;
    }
    case 5:
    {
        Deleted();
        system("PAUSE");
        system("cls");
        student ::menu();
        break;
    }

    case 6:
    {
        cout << "\n\t\t\t\t|------------------------------------------ | ";
        cout << "\n\t\t\t\t|----- Thank You... Have a Great Day! ----- |";
        cout << "\n\t\t\t\t|------------- End of the Program --------- | ";
        cout << "\n\t\t\t\t|------------------------------------------ | ";
        exit(choice);
    }
    default:
        system("cls");
        cout << "\n\n\n\t\t\t\tInvalid Choice !!!!  Enter your Choice Again ......" << endl;
        student ::menu();
    }
}

void student ::insert() // Insertion of the Data
{                       // Insertion of the records in the DATABASE .

    system("cls");

    fstream file;
    cout << "\n\t\t\t\t|----------------------------------------|";
    cout << "\n\t\t\t\t|---------- INSERT NEW RECORD -----------|";
    cout << "\n\t\t\t\t|----------------------------------------|\n";
    cout << "\n\n\t\t\t\t1 . Enter your name : ";
    cin >> name;
    cout << "\n\n\t\t\t\t Enter your Roll number : ";
    cin >> roll_no;
    cout << "\n\n\t\t\t\t Enter you Class : ";
    cin >> standard;
    cout << "\n\n\t\t\t\t Enter you Section : ";
    cin >> section;
    cout << "\n\n\t\t\t\t Enter your City : ";
    cin >> adress;
    cout << "\n\n\t\t\t\t Enter your Phone Number : ";
    cin >> Phone_number;
    cout << "\n\n\t\t\t\t Enter your Email : ";
    cin >> email;

    file.open("Database.txt", ios ::app | ios ::out);
    file << name << " " << roll_no << " " << standard << " " << section << " " << adress << " " << Phone_number << " " << email << "\n";
    file.close();
    cout << "\n\n\t\t\t\t----Data inserted successfuly---------- " << endl;
}

void student ::display() // Displaying the Data
{
    system("cls");
    int total = 1;
    fstream file;
    cout << "\n\t\t\t\t|----------------------------------------|";
    cout << "\n\t\t\t\t|----------- Student Record -------------|";
    cout << "\n\t\t\t\t|----------------------------------------|";
    file.open("Database.txt", ios::in);
    if (!file)
    {
        cout << "\n\n\t\t\t\t No Data present ." << endl;
        file.close();
    }
    else
    {
        file >> name >> roll_no >> standard >> section >> adress >> Phone_number >> email;
        while (!file.eof())
        {

            cout << "\n\n\t\t\t\t STUDENT NUMBER ==> " << total++;
            cout << "\n\n\t\t\t\t Student's name : " << name;
            cout << "\n\t\t\t\t Student's Roll number : " << roll_no;
            cout << "\n\t\t\t\t Student's Class : " << standard;
            cout << "\n\t\t\t\t Student's Section : " << section;
            cout << "\n\t\t\t\t Student's City : " << adress;
            cout << "\n\t\t\t\t Student's Phone Number : " << Phone_number;
            cout << "\n\t\t\t\t Student's Email : " << email << endl;
            file >> name >> roll_no >> standard >> section >> adress >> Phone_number >> email;
        }
        if (total == 1)
        {
            cout << "\n\t\t\t\t***** No Data present ******" << endl;
        }
        file.close();
    }
}

void student ::modify() // Edit your Data
{
    system("cls");
    fstream file, file1;
    string rollno;
    int found = 0;
    cout << "\n\t\t\t\t|----------------------------------------|";
    cout << "\n\t\t\t\t|-------- MODIFY Student Record ---------|";
    cout << "\n\t\t\t\t|----------------------------------------|";

    file.open("Database.txt", ios ::in);
    if (!file)
    {
        cout << "\n\n\t\t\t\t No Data present ." << endl;
        file.close();
    }
    else
    {
        cout << "\n\n\t\t\t\tEnter Student's Roll Number to modify their Data : ";
        cin >> rollno;
        file1.open("Record.txt", ios ::app | ios ::out);
        file >> name >> roll_no >> standard >> section >> adress >> Phone_number >> email;
        while (!file.eof())
        {
            if (rollno != roll_no)
            {
                file1 << name << " " << roll_no << " " << standard << " " << section << " " << adress << " " << Phone_number << " " << email << "\n";
            }
            else
            {
                cout << "\n\n\t\t\t\t Enter your name : ";
                cin >> name;
                cout << "\t\t\t\t Enter your Roll number : ";
                cin >> roll_no;
                cout << "\t\t\t\t Enter you Class : ";
                cin >> standard;
                cout << "\t\t\t\t Enter you Section : ";
                cin >> section;
                cout << "\t\t\t\t Enter your City : ";
                cin >> adress;
                cout << "\t\t\t\t Enter your Phone Number : ";
                cin >> Phone_number;
                cout << "\t\t\t\t Enter your Email : ";
                cin >> email;

                file1 << name << " " << roll_no << " " << standard << " " << section << " " << adress << " " << Phone_number << " " << email << "\n";
                found++;
            }
            file >> name >> roll_no >> standard >> section >> adress >> Phone_number >> email;
        }
        if (found == 0)
        {
            cout << "\n\n\t\t\t\tStudent Roll Number Not Found\n";
        }
        file1.close();
        file.close();
        remove("Database.txt");
        rename("Record.txt", "Database.txt");
    }
}

void student ::search()
{ // Search your Data

    system("cls");
    fstream file;
    int found = 0;
    cout << "\n\t\t\t\t|----------------------------------------|";
    cout << "\n\t\t\t\t|-------- SEARCH Student Record ---------|";
    cout << "\n\t\t\t\t|----------------------------------------|";
    file.open("Database.txt", ios ::in);

    if (!file)
    {
        cout << "\n\n\t\t\t\t No Data present ." << endl;
        file.close();
    }
    else
    {
        string rollno;
        cout << "\n\n\t\t\t\tEnter Student's Roll Number to display their Data : ";
        cin >> rollno;
        file >> name >> roll_no >> standard >> section >> adress >> Phone_number >> email;
        while (!file.eof())
        {
            if (rollno == roll_no)
            {
                cout << "\n\n\t\t\t\t Student's name : " << name;
                cout << "\n\t\t\t\t Student's Roll number : " << roll_no;
                cout << "\n\t\t\t\t Student's Class : " << standard;
                cout << "\n\t\t\t\t Student's Section : " << section;
                cout << "\n\t\t\t\t Student's City : " << adress;
                cout << "\n\t\t\t\t Student's Phone Number : " << Phone_number;
                cout << "\n\t\t\t\t Student's Email : " << email << endl;
                found++;
            }
            file >> name >> roll_no >> standard >> section >> adress >> Phone_number >> email;
        }
        if (found == 0)
        {
            cout << "\n\t\t\t\tStudent didn't exist with this Roll Number" << endl;
        }
        file.close();
    }
}

void student ::Deleted()
{ // Remove your Data

    system("cls");
    fstream file, file1;
    string rollno;
    int found = 0;

    cout << "\n\t\t\t\t|----------------------------------------|";
    cout << "\n\t\t\t\t|-------- DELETE Student Record ---------|";
    cout << "\n\t\t\t\t|----------------------------------------|";
    file.open("Database.txt", ios ::in);
    if (!file)
    {
        cout << "\n\n\t\t\t\tNo Data is Present ";
    }
    else
    {
        cout << "\n\n\t\t\t\tEnter Student's Roll number to delete his/her data : ";
        cin >> rollno;
        file1.open("Record.txt", ios ::app | ios ::out);
        file >> name >> roll_no >> standard >> section >> adress >> Phone_number >> email;
        while (!file.eof())
        {
            if (rollno != roll_no)
            {
                file1 << name << " " << roll_no << " " << standard << " " << section << " " << adress << " " << Phone_number << " " << email << "\n";
            }
            else
            {
                found++;
                cout << "\n\n\t\t\t\t" << name << " Data is Successfully Deleted \n";
            }
            file >> name >> roll_no >> standard >> section >> adress >> Phone_number >> email;
        }
        if (found == 0)
        {
            cout << "\n\n\t\t\t\tStudent Roll Number is not present .....\n\n";
        }
        file1.close();
        file.close();
        remove("Database.txt");
        rename("Record.txt", "Database.txt");
    }
}

int main()
{
    student project;
    project.menu();
    return 0;
}
