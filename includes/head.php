<!doctype html>
<html lang="en">
  <head>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    
    <meta property="og:image" content="https://michaelwhallman.com/images/logos/og.jpg"/>
    <meta property="og:title" content="Michael W Hallman | Sr Engineering Manager"/>
    <meta property="og:description" content="Experienced Data-driven Engineering Manager | Expertise in Experimentation, Personalization, and Front-end Development"/>
    <meta property="og:image:width" content="1200"/>
    <meta property="og:image:height" content="630"/>
    
    <title><?php if (isset($title)) echo $title." | "; ?>Michael W Hallman | Sr Engineering Manager</title>
    <meta name="description" content="Experienced Data-driven Engineering Manager | Expertise in Experimentation, Personalization, and Front-end Development">
    
    <?php if (!isset($exclude_bootstrap)):  ?>
      <link rel="stylesheet" href="/includes/css/bootstrap-theme.min.css">
      <link rel="stylesheet" href="/includes/css/bootstrap.min.css">
    <?php endif; ?>
    <link rel="stylesheet" href="/includes/css/main.css">
    
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-YCHET003YV"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-YCHET003YV');
    </script>
  </head>
  <body>
    <div id="header" class="header">
      <?php include($_SERVER['DOCUMENT_ROOT'] . "/includes/logo.php"); ?>
      <nav id="nav">
        <a href="/">MWH</a> | <a href="/projects">Projects</a> | <a href="/resume">Resume</a> | <a href="https://www.linkedin.com/in/hallmanm" target="_blank">Contact</a>
      </nav>
    </div>
    <?php if (!isset($exclude_container)):  ?> <div class="container"> <?php endif; ?>