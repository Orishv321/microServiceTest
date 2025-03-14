const updateSummary = async (dbClient) => {
    const query = `
      INSERT INTO user_summary(user_id, total_messages)
      SELECT user_id, COUNT(*) 
      FROM messages
      GROUP BY user_id
      ON CONFLICT (user_id) DO UPDATE 
      SET total_messages = EXCLUDED.total_messages;
    `;
  
    try {
      await dbClient.query(query);
      console.log('Summary table updated');
    } catch (err) {
      console.error('Error updating summary:', err);
    }
  };
  module.exports = updateSummary;