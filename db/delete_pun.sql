DELETE FROM puns 
WHERE pun_id = $1

SELECT * FROM puns ORDER BY pun_id