
## How to sort Asstes by difficulty ?

### Before starting
First, delete the file named token.json if it present in the folder

Then, regenerate it by following theses steps:

- Do this command:
```bash
$> node getToken.js
```
- click on the URL and select your google profile.
- You should arrive on a page that gives you an error. No problem we only need the param **code** in the url.
- copy the param **code** and put it in a url decoder like [this one](https://meyerweb.com/eric/tools/dencoder/).
- copy the result and paste it in your terminal where the program ask you to paste it.
- That's all, you should see a new token.json appear in your directory.

### Sort Assets

go to the file **playlistSorter.js** and go down to the end of the file to the main function.
Here you can select wich asset you want to sort by youtube Views. Juste change the path and repeat the run line for every file you want to sort.

Finally, do this command:
```bash
$> node playlistSorter.js
```
Wait Until the program stop.

That's all ! Well done ! Your assets are now sorted by view and regrouped into differents files by alphabetical orders.
You can find them in the directories created for each assets you wanted to sort.