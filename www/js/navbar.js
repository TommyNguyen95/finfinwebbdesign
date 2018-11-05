/* Gets the data stored in JSON-file and adds that to te function and starts it */
$.getJSON('/json/navbar.json', navbarfunction);

/*Creates a function named navbarfunction, which expects to get data it will store inside the variable "language_data" */
function navbarfunction(language_data) {

  /*Hides the OLD html code from navbar*/
  /*$(document.getElementById('nav')).hide(); */

  /*Creates an empty unsorted list (will add the navbar in here)*/
  let ul_sv = $('<ul/>').attr('class', 'navbar-nav');
  let ul_en = $('<ul/>').attr('class', 'navbar-nav');

  /*Create four empty sorted lists (will add the idividual items (higscor, historia etc)into these lists. */
  let navitem1_sv = $('<li/>').attr('class', 'nav-item nav-margin');
  let navitem2_sv = $('<li/>').attr('class', 'nav-item nav-margin');
  let navitem3_sv = $('<li/>').attr('class', 'nav-item nav-margin');
  let navitem4_sv = $('<li/>').attr('class', 'nav-item nav-margin');
  let navitem5_sv = $('<li/>').attr('class', 'nav-item icon-resize')

  /*Create four empty sorted lists (will add the idividual items (higscor, history etc)into these lists. */
  let navitem1_en = $('<li/>').attr('class', 'nav-item nav-margin');
  let navitem2_en = $('<li/>').attr('class', 'nav-item nav-margin');
  let navitem3_en = $('<li/>').attr('class', 'nav-item nav-margin');
  let navitem4_en = $('<li/>').attr('class', 'nav-item nav-margin');
  let navitem5_en = $('<li/>').attr('class', 'nav-item icon-resize')

  /* Append adds the text stored in langu age-date (taken from JSON file)and html-code to the navbar item (empty list)*/
  navitem5_sv.append('<a class="nav-link" href="' + language_data[0].link + '"><i class="' + language_data[0].icon + '"></i>' + language_data[0].title.sv + '</a>');
  navitem1_sv.append('<a class="nav-link" href="' + language_data[1].link + '"><i class="' + language_data[1].icon + '"></i>' + language_data[1].title.sv + '</a>');
  navitem2_sv.append('<a class="nav-link" href="' + language_data[2].link + '"><i class="' + language_data[2].icon + '"></i>' + language_data[2].title.sv + '</a>');
  navitem3_sv.append('<a class="nav-link" href="' + language_data[3].link + '"><i class="' + language_data[3].icon + '"></i>' + language_data[3].title.sv + '</a>');
  navitem4_sv.append('<a class="nav-link" href="' + language_data[4].link + '"><i class="' + language_data[4].icon + '"></i>' + language_data[4].title.sv + '</a>');

  /* Append adds the text stored in language-date (taken from JSON file)and html-code to the navbar item (empty list)*/
  navitem5_en.append('<a class="nav-link" href="' + language_data[0].link + '"><i class="' + language_data[0].icon + '"></i>' + language_data[0].title.en + '</a>');
  navitem1_en.append('<a class="nav-link" href="' + language_data[1].link + '"><i class="' + language_data[1].icon + '"></i>' + language_data[1].title.en + '</a>');
  navitem2_en.append('<a class="nav-link" href="' + language_data[2].link + '"><i class="' + language_data[2].icon + '"></i>' + language_data[2].title.en + '</a>');
  navitem3_en.append('<a class="nav-link" href="' + language_data[3].link + '"><i class="' + language_data[3].icon + '"></i>' + language_data[3].title.en + '</a>');
  navitem4_en.append('<a class="nav-link" href="' + language_data[4].link + '"><i class="' + language_data[4].icon + '"></i>' + language_data[4].title.en + '</a>');

  /* Adds the navitems to the unsorted list*/
  ul_sv.append(navitem5_sv);
  ul_sv.append(navitem1_sv);
  ul_sv.append(navitem2_sv);
  ul_sv.append(navitem3_sv);
  ul_sv.append(navitem4_sv);

  ul_en.append(navitem5_en);
  ul_en.append(navitem1_en);
  ul_en.append(navitem2_en);
  ul_en.append(navitem3_en);
  ul_en.append(navitem4_en);

  /*Adds the unsorted list that stores the sorted list to the navbar*/
  $(document.getElementById('navbarNavDropdown')).append(ul_sv);
  $(document.getElementById('navbarNavDropdown')).append(ul_en);

  /*The English are hidden (until English flag is clicked on)*/
  ul_en.hide();

  /* When the Swedish flag is clicked on, the Swedish is shown and the English is hidden*/
  $('.svflag').click(function () {
    ul_sv.show();
    ul_en.hide();
  });
  /* When the English flag is clicked on, the English is shown and Swedish is hidden*/
  $('.ukflag').click(function () {
    ul_sv.hide();
    ul_en.show();
  });

  /* Attach click eventlistener on the whole UL since it's more effective to use event delegation 
    rather than attaching event on every single LI item
  */
  ul_sv.click(function (event) {
    let target = event.target;

    /* Since we have an icon inside an a-tag we need to be sure that we can access the link because
      because it's cruical since the link is what we are going to use as a reference to distinguish
      between the a-tags that we are going to set as active
    */
    if (target.tagName == 'I') {
      target = target.parentElement;
    }

    /* If the item that we are clicking on is an a-tag, only then should we perform this action, since we don't 
      want other obscure and unpredictable actions to be performed on wrong elements 
    */
    if (target.tagName == 'A') {
      const targetUrl = target.pathname;

      /* Since we are clicking somewhere inside the UL we should look for all the a-tags and to 
        safe than sorry, so we simply remove all the tags on every single one  
      */
      $(this).find('a').removeClass('active');
      /* Also remove the active class on all the items in the english version just to be safe */
      $(ul_en).find('a').removeClass('active')

      /* Set the current element we clicked with the class active to indicate.. obviously that it's definately is active...
        Based on url that lies within the a-tag and that we extracted to the variable "targetUrl". We use "targetUrl" to find the corresponding
        item in the english version of the navbar and set it to active so we can toggle back and forth between english and swedish.
      */
      $(target).addClass('active');
      $(ul_en).find('a[href="' + targetUrl + '"]').addClass('active');

    }
  })

  ul_en.click(function (event) {
    let target = event.target;
    if (target.tagName == 'I') {
      target = target.parentElement;
    }

    if (target.tagName == 'A') {
      const targetUrl = target.pathname;
      $(this).find('a').removeClass('active');
      $(ul_sv).find('a').removeClass('active')
      $(target).addClass('active');
      $(ul_sv).find('a[href="' + targetUrl + '"]').addClass('active');
    }
  })

  /* Initially set the state in the navbar based on the location.pathname by querying the links in swedish and english ULs
    and set the class active.
  */
  $(ul_sv).find('a[href="' + location.pathname + '"]').addClass('active');
  $(ul_en).find('a[href="' + location.pathname + '"]').addClass('active');
}