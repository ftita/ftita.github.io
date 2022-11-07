<?php
$keys = isset($_GET['key']) ? array_map('trim', explode(',', strtolower($_GET['key']))) : array();
$packages = array();

if (count(array_intersect(array('ijb2x8hd6q57bm65ynvvkq'), $keys)) > 0)
$packages[] = array(
    'name' => 'Vanilla',
    'title' => 'Vanilla',
    'version' => '2022-11-07-13-05-38',
    'priority' => 0,
    'location' => 'vanilla.json',
);

$out = array('minimumVersion' => 1, 'packages' => $packages);
header('Content-Type: text/plain; charset=utf-8');
echo json_encode($out);
