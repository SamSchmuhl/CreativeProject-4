document.getElementById("rulesSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("rulesInput").value;
  if (value === "")
    return;
  console.log(value);

  if(value.substring(0,6) == "spells") {
    const url = "https://api-beta.open5e.com/" + value;
    fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
        let results = "";
        results += '<h1>' + json.name + "</h1><hr>";

        results += '<p><b><u>Page</u>:</b> ' + json.page + '</p><br>';

        results += '<p><b><u>Level</u>:</b> ' + json.level + '<br>';
        results += '<b><u>School</u>:</b> ' + json.school + '<br>';
        results += '<b><u>Ritual</u>:</b> ' + json.ritual + '</p><br>';

        results += '<p><b><u>Casting Time</u>:</b> ' + json.casting_time + '<br>';
        results += '<b><u>Range</u>:</b> ' + json.range + '<br>';
        results += '<b><u>Components</u>:</b> ' + json.components + '<br>';
        results += '<b><u>Material</u>:</b> ' + json.material + '<br>';
        results += '<b><u>Duration</u>:</b> ' + json.duration + '<br>';
        results += '<b><u>Concentration</u>:</b> ' + json.concentration + '</p><br>';

        results += '<p><b><u>Description</u>:</b> ' + json.desc + '</p><br>';

        results += '<p><b><u>At Higher Levels</u>:</b> ' + json.higher_level + '</p><br>';

        document.getElementById("rulesResults").innerHTML = results;
      });
  }

  else if(value.substring(0,8) == "monsters") {
    const url = "https://api-beta.open5e.com/" + value;
    fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
        let results = "";
        results += '<h1>' + json.name + "</h1><hr>";

        results += '<p><b><u>Challenge Rating</u>:</b> ' + json.challenge_rating + '</p><br>';

        results += '<p><b><u>Size</u>:</b> ' + json.size + '<br>';
        results += '<b><u>Type</u>:</b> ' + json.type + '<br>';
        results += '<b><u>Subtype</u>:</b> ' + json.subtype + '<br>';
        results += '<b><u>Alignment</u>:</b> ' + json.alignment + '</p><br>';

        results += '<p><b><u>Armor Class</u>:</b> ' + json.armor_class + ', ' + json.armor_desc + '<br>';
        results += '<b><u>Hit Points</u>:</b> ' + json.hit_points + ' (' + json.hit_dice + ')<br>';
        results += '<b><u>Speed</u>:</b> ' + json.speed.walk + '</p><br>';

        results += '<p><b><u>Strength</u>:</b> ' + json.strength + '<br>';
        results += '<b><u>Dexterity</u>:</b> ' + json.dexterity + '<br>';
        results += '<b><u>Constitution</u>:</b> ' + json.constitution + '<br>';
        results += '<b><u>Intelligence</u>:</b> ' + json.intelligence + '<br>';
        results += '<b><u>Wisdom</u>:</b> ' + json.wisdom + '<br>';
        results += '<b><u>Charisma</u>:</b> ' + json.charisma + '</p><br>';

        document.getElementById("rulesResults").innerHTML = results;
      });
  }

  else if(value.substring(0,7) == "classes") {
    const url = "https://api-beta.open5e.com/" + value;
    fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
        let results = "";
        results += '<h1>' + json.name + "</h1><hr>";

        results += '<p><b><u>Hit Dice</u>:</b> ' + json.hit_dice + '<br>';
        results += '<b><u>HP At First Level</u>:</b> ' + json.hp_at_1st_level + '<br>';
        results += '<b><u>HP After First Level</u>:</b> ' + json.hp_at_higher_levels + '</p><br>';

        results += '<p><b><u>Armor</u>:</b> ' + json.prof_armor + '<br>';
        results += '<b><u>Weapons</u>:</b> ' + json.prof_weapons + '<br>';
        results += '<b><u>Tools</u>:</b> ' + json.prof_tools + '<br>';
        results += '<b><u>Saving Throws</u>:</b> ' + json.prof_saving_throws + '<br>';
        results += '<b><u>Skills</u>:</b> ' + json.prof_skills + '</p><br>';

        results += '<p><b><u>Starting Equipment</u>:</b> ' + json.equipment + '</p><br>';

        document.getElementById("rulesResults").innerHTML = results;
      });
  }

  else if(value.substring(0,5) == "races") {
    const url = "https://api-beta.open5e.com/" + value;
    fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
        let results = "";
        results += '<h1>' + json.name + "</h1><hr>";
        document.getElementById("rulesResults").innerHTML = results;
      });
  }
  });
